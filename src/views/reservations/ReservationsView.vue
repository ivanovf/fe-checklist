<template>
  <div id="filters" class="flex flex-wrap justify-between p-6 border border-slate-300 rounded-md m-2">
    <h2 class="text-md font-bold">Filtrar</h2>
    <div class="flex flex-wrap">
      <div class="flex items-center mb-4">
        <label for="sort" class="text-sm mr-2">Ordenar:</label>
        <select id="sort" class="mr-2 ml-2 border border-slate-300 rounded-md p-1 text-sm" v-model="sort">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label for="type" class="mr-2 text-sm">Tipo:</label>
        <select id="type" class="border border-slate-300 rounded-md p-1 text-sm" v-model="type">
          <option value="all">Todos</option>
          <option value="airbnb">AirBnB</option>
          <option value="booking">Booking</option>
          <option value="direct">Directo</option>
        </select>
        <label for="validated" class="mr-2 ml-2 text-sm">Validada:</label>
        <input type="checkbox" id="validated" class="mr-2 border border-slate-300 rounded-md p-1 text-sm" v-model="validated">
      </div>

      <div id="by-date" class="flex items-center mb-4">
        <label for="date" class="mr-2 text-sm">Desde</label>
        <input type="date" id="date-ini" class="mr-2 border border-slate-300 rounded-md p-1 text-sm" v-model="dateFrom">
        <label for="date-end" class="mr-2 mr-2">a</label>
        <input type="date" id="date-end" class="mr-2 border border-slate-300 rounded-md p-1 text-sm" v-model="dateTo">
      </div>
    </div>
    <div class="flex items-center ml-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="filter">
        Buscar
      </button>
    </div>
  </div>

  <div class="m-6 max-w-sm grid grid-cols-3 gap-4 border-b border-slate-300"
    v-for="r in reservations" v-bind:key="r._id">
    <div>
      <router-link
        :to="{ name: 'reservation-edit', params: { id: r._id } }">
      <div class="calendar">
        {{ getDay(r.dateEnd) }}
      </div>
      <div class="px-4">
        <img :src="getImageUrl(r.type)" alt="" class="w-14 h-10 text-gray-500 dark:text-gray-400">
      </div>
      </router-link>
    </div>
    <div class="text-left col-span-2">
      <router-link
        :to="{ name: 'reservation-edit', params: { id: r._id } }">
        <p class="mb-4">
          <strong>Llegada: </strong>{{ getMonth(r.dateIni) }} {{ getDay(r.dateIni) }} <br>
        </p>
        <p>
          <strong>Salida: </strong> {{ getMonth(r.dateEnd) }} {{ getDay(r.dateEnd) }}
        </p>
      </router-link>
    </div>
  </div>
  <plus-button route="reservation-new"></plus-button>
</template>
<script>
import PlusButton from '@/components/atoms/PlusButton';

export default {
  components: {
    PlusButton
  },
  data() {
    return {
      reservations: [],
      sort: 'asc',
      type: 'all',
      dateFrom: '',
      dateTo: '',
      validated: false
    }
  },
  methods: {
    getImageUrl(filename) {
      return require(`@/assets/logos/${filename}.svg`)
    },
    filter() {
      this.getReservations(false);
    },
    async getReservations(initial = false) {
      let url = `/reservations/all`;

      if (!initial) {
        const params = new URLSearchParams();

        if (this.dateFrom) params.append('dateFrom', this.dateFrom);
        if (this.dateTo) params.append('dateTo', this.dateTo);
        if (this.sort !== 'asc') params.append('sort', this.sort);
        if (this.type !== 'all') params.append('type', this.type);

        if (this.validated) params.append('validated', this.validated);

        url += `?${params.toString()}`;
      }

      const { error, data } = await this.callEndpoints(this.axios, 'get', url, localStorage.token);
      if (error) {
        this.$router.push({ name: 'home' });
      } else {
        this.reservations = data;
      }
    },
  },
  async mounted() {
    this.getReservations(true);
  }
}
</script>
<style scoped>
  .calendar {
    background: url('~@/assets/icons/calendar.svg') no-repeat;
    background-size: 45px 45px;
    background-position: center;
    height: 50px;
    padding-top: 22px;
    font-weight: bold;
  }
</style>
