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
  </main>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      reservations: [],
    }
  },
  methods: {
    dateFormat(dateFormat) {
      const date = new Date(dateFormat);
      const month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(date);
      const lastPart = month.slice(1);
      return `${date.getDate()} de ${month.charAt(0).toUpperCase() + lastPart }`;
    }
  },
  async mounted() {
    const response = await this.callEndpoints(
      this.axios,
      'get',
      '/reservations/all?sort=asc&old=true&validated=false',
      localStorage.token
    );
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'home' });
    }
    else {
      this.reservations = response.data;
    }
  }
}
</script>
