<template>
  <div v-if="$route.name === 'activity-detail-delete'">
    <h2>¿Esta seguro de eliminar el evento?</h2>
    <button
      v-on:click="deleteActivity"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded">
      Eliminar
    </button>
    <router-link :to="{ name: 'activities' }" >
      Cancelar
    </router-link>
  </div>
  <div v-else>
    <SelectBoxField
      name="activityType"
      label="Actividad"
      v-model="activity.type"
      inputId="activityType"
      :options="typeOptions"
    />
    <VueDatePicker
        v-model="activity.date"
        format="Y-m-d"
      ></VueDatePicker>

    <CurrencyField
      name="price"
      label="Precio"
      v-model="activity.price"
      inputId="price"
      :options="{ currency: 'COP', narrowSymbol: true, code: 'co', symbol: '$' }"
    />

    <text-area-field
      inputId="activity-description"
      name="description"
      label="Descripción de la actividad"
      v-model="activity.description"
      :msg="errors.description">
    </text-area-field>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

  </div>
</template>

<script>
import CurrencyField from '@/components/fields/CurrencyField.vue';
import SelectBoxField from '@/components/fields/SelectBoxField.vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import TextAreaField from '@/components/fields/TextAreaField.vue';

export default {
  components: { CurrencyField, VueDatePicker, SelectBoxField, TextAreaField },
  props:['id'],
  data() {
    return {
      activity: {
        status: false,
        date: '',
        price: 0,
        type: '',
      },
      typeOptions: [],
      validations: [
        {
          field: 'date',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'price',
          rules: [
            { required: true }
          ]
        }
      ],
      errors: {}
    }
  },
  methods: {
    async deleteActivity() {
      const response = await this.callEndpoints(
        this.axios,
        'delete',
        `/activity/${this.id}`, localStorage.token
      );

      if (response?.error) {
        this.message = {
          text: response.error.displayMsg,
          type: response.error.type,
          show: true,
        }
      }
      else {
        this.message = {
          text: response?.data?.deleted  === true ? 'evento eliminado correctamente.' : 'Ocurrio un error',
          type: 'success',
          show: true,
        }
      }

      this.$router.push({ name: 'activities' });

    },
    async save() {
      this.errors = this.validateForm(this.validations, this.activity);
      if (Object.keys(this.errors).length > 0) {
        return false;
      }

      if (this.id && this.$route.name === 'activity-detail-edit') {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/activity/${this.id}`,
          localStorage.token,
          this.activity
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'activities' });
        }
      }
      else {
        const response = await this.callEndpoints(
          this.axios,
          'post',
          '/activity/',
          localStorage.token,
          this.activity
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'activities' });
        }
      }
    }
  },
  async mounted() {
    let response = await this.callEndpoints(
      this.axios,
      'get',
      '/activity-type',
      localStorage.token
    );

    if (response?.error?.status === 401) {
      this.$router.push({ name: 'activities' });
    }
    else {
      this.typeOptions = response.data.map((item) => {
        return {
          label: item.name,
          value: item._id
        }
      });
    }

    if (this.id && this.$route.name === 'activity-detail-edit') {
      response = await this.callEndpoints(
        this.axios,
        'get',
        `/activity/${this.id}`,
        localStorage.token
      );

      response.data.type = response.data.type._id;
      this.activity = {...response.data};

      if (response?.error?.status === 401) {
        this.$router.push({ name: 'activities' });
      }
      else {
        this.activity = {...response.data};
      }
    }
  }
}
</script>
