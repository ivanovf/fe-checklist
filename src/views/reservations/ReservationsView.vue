<template>
  <h1 class="mt-4 p-2 text-xl font-bold">Reservas</h1>
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
    }
  },
  methods: {
    getImageUrl(filename) {
      return require(`@/assets/logos/${filename}.svg`)
    },
  },
  async mounted() {
    const { error, data } = await this.callEndpoints(this.axios, 'get', '/reservations/all?sort=asc', localStorage.token);
    if (error) {
      this.$router.push({ name: 'home' });
    }
    else {
      this.reservations = data;
    }
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
