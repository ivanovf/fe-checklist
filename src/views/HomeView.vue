<template>
  <main>
    <p v-if="!reservations" class="my-4 p-2 text-xl font-bold">
      No hay reservas pendientes
    </p>
    <p v-else class="my-4 p-2 text-xl font-bold">
      Reservas pendientes
    </p>
    <div v-for="r in reservations" v-bind:key="r._id">
      <router-link :to="{ name: 'validate-checklist', params: {id: r._id } }" class="block shadow rounded-md p-4 bg-sky-100 my-2">
        <p class="text-lg font-bold">
          <img src="@/assets/icons/check-sign.svg" width="25" class="inline rounded-full border bg-green-400" /> {{ dateFormat(r.dateEnd) }}
        </p>
        <p class="text-sm">
          Validar Reserva
        </p>
      </router-link>
    </div>

    <p v-if="!activities" class="my-4 p-2 text-xl font-bold">
      No hay actividades pendientes
    </p>
    <p v-else class="my-4 p-2 text-xl font-bold">
      Actividades por completar
    </p>
    <div v-for="a in activities" v-bind:key="a._id">
      <router-link
        :to="{ name: 'activity-detail-edit', params: {id: a._id } }"
        class="block shadow rounded-md p-3 bg-gray-100 my-2">
        <p class="text-md">
          <span class="text-xl font-bold italic">$</span> {{ a.type.name }}
        </p>
      </router-link>
    </div>

    <h3 class="p-4 text-xl">Clave del candado</h3>
    <div v-if="settings.doorLock" class="grid grid-cols-4 gap-2 w-1/2 mx-auto">
      <div v-for="v, i in 4" :key="i" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold">
        {{ settings.doorLock.charAt(i) }}
      </div>
    </div>
    <h3 class="my-4 p-2 text-xl font-bold">Estado de tanques</h3>
    <div class="tank-container grid grid-cols-2 gap-4 m-4 p-4 rounded bg-cyan-50">
      <div class="tank">
        <div class="fill" :style="{ height: fillHeight }"></div>
      </div>
      <div class="percentage">{{ calculateTankFullness.toFixed(1) }}%</div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'HomeView',
  inject: ['appSettings'],
  data() {
    return {
      reservations: [],
      activities: [],
      settings: this.appSettings,
    }
  },
  methods: {
    dateFormat(dateFormat) {
      const date = new Date(dateFormat);
      const month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(date);
      const lastPart = month.slice(1);
      return `${date.getDate()} de ${month.charAt(0).toUpperCase() + lastPart }`;
    },
  },
  computed: {
    calculateTankFullness() {
      const sensorReading = this.settings.analogLecture;
      const S_min = 600;  // Minimum sensor reading (empty tank)
      const S_max = 1950; // Maximum sensor reading (full tank)
      const P_min = 0;    // Percentage at minimum reading
      const P_max = 100;  // Percentage at maximum reading

      // Check if the sensor reading is within the valid range
      if (sensorReading < S_min || sensorReading > S_max) {
        return 'No range -> ' + sensorReading;
      }

      const P = ((sensorReading - S_min) / (S_max - S_min)) * (P_max - P_min) + P_min;
      return P;
    },
    fillHeight() {
      return this.calculateTankFullness + '%'; // Set the fill height based on percentage
    }
  },
  async mounted() {
    let response = await this.callEndpoints(
      this.axios,
      'get',
      '/reservations/all?sort=asc&old=true&validated=false',
      localStorage.token
    );

    if (response?.data) {
      this.reservations = response.data;
    }

    response = await this.callEndpoints(
      this.axios,
      'get',
      '/activity?status=TODO',
      localStorage.token
    );

    if (response?.data) {
      this.activities = response.data;
    }

  }
}
</script>
<style scoped>
.tank-container {
  text-align: center;
}

.tank {
  width: 150px;
  height: 180px;
  position: relative;
  background-color: #e0e0e0;
  clip-path: polygon(10% 100%, 0% 0%, 100% 0%, 90% 100%);
}

.fill {
  background-color: dodgerblue; /* Color of the filled portion */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.5s ease; /* Smooth transition for filling effect */
}

.percentage {
  margin-top: 80px;
  font-size: 32px;
  font-weight: 800;
}
</style>
