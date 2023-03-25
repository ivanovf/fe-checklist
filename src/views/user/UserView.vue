<template>
  <div v-if="$route.name === 'user-detail-delete'">
    <h2>¿Esta seguro de eliminar este usuario?</h2>
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
    <button v-on:click="logOut" class="p-2 mb-4">Logout</button>
    <h3>{{ user.email }}</h3>
    <text-field-vue v-model="user.name" label="Nombre" inputId="name" name="name"/>
    <div v-if="$route.name === 'user-detail-edit'">
      <fieldset>
        <legend
          class="text-left text-lg leading-3 font-bold p-2 border rounded-md"
          v-on:click ="changePassword = !changePassword">Cambiar contraseña
        </legend>
        <div class="border-2 p-4 rounded-md" v-if="changePassword">
          <text-field-vue
            v-model="currentPassword"
            label="Contraseña actual"
            inputId="currentpassword"
            name="currentpassword"
            type="password"/>
          <text-field-vue
            v-model="newPassword"
            label="Nueva Contraseña"
            inputId="user-pass-new"
            name="user-pass-new"
            type="password"
            :msg="inputsError?.userPassNew"/>
          <text-field-vue
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            inputId="user-pass-confirm"
            name="user-pass-confirm"
            type="password"
            :msg="inputsError?.userPassConfirm"/>
        </div>
      </fieldset>
    </div>
    <div v-else>
      <text-field-vue v-model="user.email" label="Email" inputId="email" name="email" type="email"/>
      <text-field-vue v-model="user.password" label="Password" inputId="user-pass" name="password" type="password"/>

      <div class="text-left my-4">
        <input type="radio" name="role" id="user-status-1" class="mr-2" value="admin" v-model="user.role"/>
        <label for="user-status-1" class="font-bold w-full mr-2">Admin</label>
      </div>
      <div class="text-left my-4">
        <input type="radio" name="role" id="user-status-2" class="mr-2" value="authenticated" v-model="user.role"/>
        <label for="user-status-2" class="font-bold w-full">Authenticated</label>
      </div>
    </div>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Guardar</button>

  </div>
</template>
<script>
import TextFieldVue from '@/components/fields/TextField';

export default {
  props:['id'],
  components: {
    TextFieldVue
  },
  data() {
    return {
      user: {
        status: false
      },
      changePassword: false,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      inputsError: {}
    }
  },
  computed: {
    validPassword() {
      return this.newPassword === this.confirmPassword && this.newPassword !== null;
    }
  },
  methods: {
    reload() {
      location.reload();
    },
    logOut() {
      localStorage.removeItem('token');
      this.reload();
    },
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
        if (this.changePassword) {

          if (!this.validPassword) {
            this.inputsError.userPassNew = {
              type: 'error',
              text: 'Las contraseñas no coincide'
            }
            this.inputsError.userPassConfirm = {
              type: 'error',
              text: 'Las contraseñas no coincide'
            }
            return false;
          }
          this.user = {
            changePassword: this.changePassword,
            password: this.newPassword,
            currentPassword: this.currentPassword,
            ...this.user
          }
        }

        try {
          const response = await this.callEndpoints(
            this.axios,
            'put',
            `/users/${this.id}`, localStorage.token,
            this.user
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

            this.$router.push({ name: 'home' });
          }
        } catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          const response = await this.callEndpoints(
            this.axios,
            'post',
            '/users',
            localStorage.token,
            this.user
          );

        if (response.error) {
          // todo mensaje de error
          console.log(response.error);
        }
        else {
          this.$router.push({ name: 'home' });
        }

        } catch (error) {
          console.log(error);
        }
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
