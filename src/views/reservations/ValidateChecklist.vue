<template>
  <h1 class="my-4 p-2 text-xl font-bold">Validar checklist</h1>
  <p v-if="reservation.dateEnd" class="text-lg my-4 font-bold">
    <span class="bg-slate-100 py-2 px-4 mr-4 border-l-4 border-lime-500">
      {{ getDay(reservation.dateIni) }} de {{ getMonth(reservation.dateIni) }}
    </span>
    <span class="bg-slate-100 py-2 px-4 mr-4 border-l-4 border-red-500">
      {{ getDay(reservation.dateEnd) }} de {{ getMonth(reservation.dateEnd) }}
    </span>
  </p>
  <ul class="mb-8">
    <li
      v-for="(item, index) in reservation.items"
      class="text-left py-2 px-4 mb-2 rounded-md border"
      v-bind:key="item._id">
      <div class="flex justify-between">
        <div v-on:click.prevent="collpased = item._id">
          {{ item.label }}
        </div>
        <div>
          <check-box-field
            v-model="item.checked"
            :key="index"
            :name="`check-${item._id}`" :inputId="`check-${item._id}`">
          </check-box-field>
        </div>
      </div>
      <Transition name="fade">
        <div  v-show="collpased === item._id">
          <i><strong>Que revisar:</strong> {{ item.description }}</i>
          <text-area-field
            :inputId="'desc' + item._id"
            label="Observaciones"
            v-model="item.comments"
            :key="index"
            :name="'desc' + item._id">
          </text-area-field>
        </div>
      </Transition>
    </li>
  </ul>
  <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Validar</button>
</template>
<script>
import TextAreaField from '@/components/fields/TextAreaField';
import CheckBoxField from '@/components/fields/CheckBoxField';

export default {
  components: { TextAreaField, CheckBoxField },
  props: ['id'],
  data() {
    return {
      reservation: {},
      statusValues: {},
      collpased: null,
    }
  },
  methods: {
    async  save() {

      try {
        this.reservation.validated = true;
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/reservations/${this.id}`,
          localStorage.token,
          this.reservation
        );

        if (response.error) {
          console.log(response);
        }
        else {
          this.reservation = response.data;
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.log();
      }
    }
  },
  async mounted() {
    try {
      const response = await this.callEndpoints(
        this.axios,
        'get',
        `/reservations/${this.id}`,
        localStorage.token
      );

      if (response.error) {
        console.log(response);
      }
      else {
        this.reservation = response.data;
      }

    } catch (error) {
      console.log(error);
    }
  }
}
</script>

