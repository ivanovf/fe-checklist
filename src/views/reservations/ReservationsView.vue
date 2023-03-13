<template>
  <h1 class="mt-4 p-2 text-xl font-bold">Reservas</h1>
  <div class="m-6 max-w-sm grid grid-cols-3 gap-4"
    v-for="r in reservations" v-bind:key="r._id">
    <div>
      <div class="py-3 px-4 font-bold text-lg">
        {{ r.type }}
      </div>
    </div>
    <div>
      <router-link
        :to="{ name: 'reservation-edit', params: { id: r._id } }">
        <div class="up-triangle"></div>
        <div class="border rounded-md">
          <div class="py-2 px-4 bg-orange-500 text-white font-bold rounded-md">{{ getMonth(r.dateIni) }}</div>
          <div class="py-3 px-4 font-bold text-lg">
            {{ getDay(r.dateIni) }}
          </div>
        </div>
      </router-link>
    </div>
    <div>
      <router-link
        :to="{ name: 'reservation-edit', params: { id: r._id } }">
        <div class="down-triangle"></div>
        <div class="border rounded-md">
          <div class="py-2 px-4 bg-orange-500 text-white font-bold rounded-md">{{ getMonth(r.dateEnd) }}</div>
          <div class="py-3 px-4 font-bold text-lg">
            {{ getDay(r.dateEnd) }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="p-8 flex flex-row-reverse sticky bottom-12">
    <router-link
      :to="{ name: 'reservation-new' }"
      class="p-2 w-12 h-12 border-2 rounded-full bg-slate-100 order-black overflow-hidden" >
      <img src="@/assets/icons/plus.svg" alt="">
    </router-link>
  </div>
</template>
<script>

export default {
  data() {
    return {
      reservations: [],
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Noviembre',
        'Diciembre'
      ],
    }
  },
  methods: {
    getDay(eventDate) {
      const newDate = new Date(eventDate);
      return newDate.getDate();
    },
    getMonth(eventDate) {
      const newDate = new Date(eventDate);
      return this.months[newDate.getMonth()];
    }
  },
  async mounted() {
    const response = await this.callEndpoints(this.axios, 'get', '/reservations/all?sort=asc', localStorage.token);
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'home' });
    }
    else {
      this.reservations = response.data;
    }
  }
}
</script>
<style scoped>
.up-triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 20px solid green;
  margin: 5px auto;
}

.down-triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 20px solid red;
  margin: 5px auto;
}
</style>

