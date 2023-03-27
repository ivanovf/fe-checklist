<template>
  <div class="about">
    <h1 class="text-3xl my-4">Settings</h1>

    <h3 class="text-xl p-2 font-bold text-left border-b-2">Clave Puerta</h3>
    <text-field inputId="door" label="Clave" name="door" v-model="settings.doorLock"></text-field>
    <h3 class="text-xl p-2 font-bold text-left border-b-2">Clave Principal</h3>
    <text-field inputId="main" label="Clave" name="main" v-model="settings.mainLock"></text-field>
    <h3 class="text-xl p-2 font-bold text-left border-b-2">Límite de usuarios</h3>
    <text-field inputId="users" label="Límite" name="users" v-model="settings.usersLimit"></text-field>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
  </div>
</template>
<script>
import TextField from '@/components/fields/TextField.vue'
export default {
  components: { TextField },
  data() {
    return {
      settings: {},
      validations: [
        {
          field: 'doorLook',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'mainLook',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'doorLook',
          rules: [
            { required: true }
          ]
        },
      ],
    }
  },
  methods: {
    async save() {

      if (this.settings._id) {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/config/${this.id}`,
          localStorage.token,
          this.settings
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'home' });
        }
      }
      else {
        const response = await this.callEndpoints(
          this.axios,
          'post',
          '/config',
          localStorage.token,
          this.settings
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'home' });
        }
      }
    },
  },
  async mounted() {
    const response = await this.callEndpoints(
      this.axios,
      'get',
      '/config',
      localStorage.token
    );
    if (response?.error?.status === 401) {
      console.log(response.error);
    }
    else {
      if (response.data[0]) {
        this.settings = response.data[0];
      }
    }
  }
}
</script>
