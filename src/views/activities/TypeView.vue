<template>
  <div v-if="$route.name === 'type-detail-delete'">
    <h2>¿Esta seguro de eliminar la actividad?</h2>
    <button
      v-on:click="deleteType"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded">
      Eliminar
    </button>
    <router-link :to="{ name: 'activities' }" >
      Cancelar
    </router-link>
  </div>
  <div v-else>
    <h1 class="text-3xl mt-4">{{ activityType.name }}</h1>
    <text-field label="Typo de actividad" v-model="activityType.name" name="type" inputId="item-name" :msg="errors.name"/>
    <div class="text-left my-4">
      <text-area-field
        inputId="type-description"
        name="description"
        label="Descripción de la actividad"
        v-model="activityType.description"
        :msg="errors.description">
      </text-area-field>
    </div>
    <CurrencyField
      name="budget"
      label="Presupuesto"
      v-model="activityType.budget"
      inputId="budget"
      :options="{ currency: 'COP', narrowSymbol: true, code: 'co', symbol: '$' }"
    />
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

  </div>
</template>

<script>
import textField from '@/components/fields/TextField'
import TextAreaField from '@/components/fields/TextAreaField'
import CurrencyField from '@/components/fields/CurrencyField.vue';

export default {
  components: { textField, TextAreaField, CurrencyField },
  props:['id'],
  data() {
    return {
      activityType: {
        status: false,
        description: '',
        budget: 0,
      },
      validations: [
        {
          field: 'name',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'description',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'budget',
          rules: [
            { required: true }
          ]
        }
      ],
      errors: {}
    }
  },
  methods: {
    async deleteType() {
      const response = await this.callEndpoints(
        this.axios,
        'delete',
        `/activity-type/${this.id}`, localStorage.token
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
          text: response?.data?.deleted  === true ? 'Item eliminado correctamente.' : 'Ocurrio un error',
          type: 'success',
          show: true,
        }
      }

      this.$router.push({ name: 'activities' });

    },
    async save() {
      this.errors = this.validateForm(this.validations, this.activityType);
      if (Object.keys(this.errors).length > 0) {
        return false;
      }

      if (this.id && this.$route.name === 'activity-types-edit') {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/activity-type/${this.id}`,
          localStorage.token,
          this.activityType
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
          '/activity-type/',
          localStorage.token,
          this.activityType
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'items' });
        }
      }
    }
  },
  async mounted() {
    if (this.id && this.$route.name === 'activity-types-edit') {
      const response = await this.callEndpoints(
        this.axios,
        'get',
        `/activity-type/${this.id}`,
        localStorage.token
      );

      this.activityType = {...response.data};
      if (response?.error?.status === 401) {
        this.$router.push({ name: 'activities' });
      }
      else {
        this.activityType = {...response.data};
      }
    }
  }
}
</script>
