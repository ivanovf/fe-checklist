<template>
  <div v-if="$route.name === 'user-detail-delete'">
    <h2>¿Esta seguro de eliminar este user?</h2>
    <button
      v-on:click="deleteUser"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded">
      Eliminar
    </button>
    <router-link :to="{ name: 'users' }" >
      Cancelar
    </router-link>
  </div>
  <div v-else class="mt-8 p-4">
    <h1 class="text-3xl mt-4">{{ user.email }}</h1>
    <div class="text-left my-4">
      <label for="user-email" class="font-bold mr-2">Email:</label>
      <input type="email" name="email" id="user-email" v-model="user.email"  class="border-2 rounded w-full"/>
    </div>

    <div class="text-left my-4">
      <label for="user-name" class="font-bold mr-2">Nombre:</label>
      <input type="name" name="name" id="user-name" v-model="user.name"  class="border-2 rounded w-full"/>
    </div>

    <div class="text-left my-4">
      <label for="user-pass" class="font-bold mr-2">Password:</label>
      <input type="password" name="password" id="user-pass" v-model="user.password"  class="border-2 rounded w-full"/>
    </div>

    <div class="text-left my-4">
      <input type="radio" name="role" id="user-status-1" class="mr-2" value="admin" v-model="user.role"/>
      <label for="user-status-1" class="font-bold w-full mr-2">Admin</label>
    </div>
    <div class="text-left my-4">
      <input type="radio" name="role" id="user-status-2" class="mr-2" value="authenticated" v-model="user.role"/>
      <label for="user-status-2" class="font-bold w-full">Authenticated</label>
    </div>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

  </div>
</template>
<script>
export default {
  props:['id'],
  data() {
    return {
      user: {
        status: false
      },
    }
  },
  methods: {
    async deleteUser() {
      const response = await this.callEndpoints(
        this.axios,
        'delete',
        `/users/${this.id}`, localStorage.token
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
          text: response?.data?.deleted  === true ? 'user eliminado correctamente.' : 'Ocurrio un error',
          type: 'success',
          show: true,
        }
      }

      this.$router.push({ name: 'users' });

    },
    async save() {
      if (this.id && this.$route.name === 'user-detail-edit') {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          this.user,
          `/users/${this.id}`, localStorage.token
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
            text: response?.data?.deleted  === true ? 'user eliminado correctamente.' : 'Ocurrio un error',
            type: 'success',
            show: true,
          }
        }
      }
      else {
        this.axios.post(
          `${process.env.VUE_APP_BE_HOST}/users/`,
          this.user,
          { headers: {'Authorization': `Bearer ${ localStorage.token }`}}
          ).then(response => {
            console.log(response);
            this.$router.push({ name: 'users' })
          }).catch();
      }
    }
  },
  async mounted() {
    if (this.id && this.$route.name === 'user-detail-edit') {
      const response = await this.callEndpoints(
        this.axios,
        'get',
        `/users/${this.id}`, localStorage.token
      );

      if (response?.error?.status === 401) {
        this.$router.push({ name: 'users' });
      }
      else {
        this.user = {...response.data};
      }
    }
  }
}
</script>
