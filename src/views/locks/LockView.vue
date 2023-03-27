<template>
  <div v-if="$route.name === 'lock-detail-delete'">
    <h2>¿Esta seguro de eliminar esta clave?</h2>
    <button
      v-on:click="deleteLock"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded">
      Eliminar
    </button>
    <router-link :to="{ name: 'locks' }" >
      Cancelar
    </router-link>
  </div>
  <div v-else>
    <h1 class="text-3xl my-4">Claves de puerta</h1>
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de usuario</label>
    <select name="user-number" id="user-number" v-model="lock.userNumber"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 mb-4 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="i in 20" :value="i < 10 ? `0${i}`: i" :key="i" :disabled="usersUsed.includes(i < 10 ? `0${i}`: i)">
        {{ i < 10 ? `0${i}`: i }}
      </option>
    </select>
    <div class="grid grid-cols-5 gap-2 w-3/5 mx-auto mb-4">
      <input type="number" min="0" max="9" v-model="boxes[0]" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold" />
      <input type="number" min="0" max="9" v-model="boxes[1]" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold" />
      <input type="number" min="0" max="9" v-model="boxes[2]" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold" />
      <input type="number" min="0" max="9" v-model="boxes[3]" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold" />
      <button v-on:click="randomLock(9999)" class="p-1 bg-cyan-400 rounded-full ">
        <img src="@/assets/icons/shuffle.svg" alt="random" width="25"/>
      </button>
    </div>

    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

    <div v-if="lock.lock && lock.userNumber && settings.mainLock">
      <h3 class="text-xl p-2 font-bold text-left border-b-2">Instrucciones</h3>
      <p class="p-2 text-left">Toque cualquier número para activar el teclado y siga las siguientes instrucciones:</p>

      <h4 class="text-md p-2 font-bold text-left">Para agregar</h4>
      <div class="grid grid-cols-7 gap-1 place-items-center bg-gray-500 p-2 rounded">
        <circle-number :num="settings.mainLock.charAt(0)"/>
        <circle-number :num="settings.mainLock.charAt(1)"/>
        <circle-number :num="settings.mainLock.charAt(2)"/>
        <circle-number :num="settings.mainLock.charAt(3)"/>
        <img src="@/assets/icons/lock-green.svg" alt="random"/>
        <circle-number num="1"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number :num="lock.userNumber.charAt(0)"/>
        <circle-number :num="lock.userNumber.charAt(1)"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number :num="boxes[0]"/>
        <circle-number :num="boxes[1]"/>
        <circle-number :num="boxes[2]"/>
        <circle-number :num="boxes[3]"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number :num="boxes[0]"/>
        <circle-number :num="boxes[1]"/>
        <circle-number :num="boxes[2]"/>
        <circle-number :num="boxes[3]"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
      </div>
      <h4 class="text-md p-2 font-bold text-left">Para eliminar</h4>
      <div class="grid grid-cols-7 gap-1 place-items-center bg-gray-500 p-2 rounded">
        <circle-number :num="settings.mainLock.charAt(0)"/>
        <circle-number :num="settings.mainLock.charAt(1)"/>
        <circle-number :num="settings.mainLock.charAt(2)"/>
        <circle-number :num="settings.mainLock.charAt(3)"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number num="2"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number :num="lock.userNumber.charAt(0)"/>
        <circle-number :num="lock.userNumber.charAt(1)"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>
        <circle-number :num="lock.userNumber.charAt(0)"/>
        <circle-number :num="lock.userNumber.charAt(1)"/>
        <img src="@/assets/icons/lock-green.svg" alt="random" width="60"/>

      </div>
    </div>
  </div>
</template>

<script>
import CircleNumber from '@/components/atoms/CircleNumber.vue';
export default {
  components: { CircleNumber },
  props:['id'],
  data() {
    return {
      lock: {},
      boxes: [0,0,0,0],
      usersUsed: [],
      validations: [
        {
          field: 'lock',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'userNumber',
          rules: [
            { required: true }
          ]
        },
      ],
      errors: {},
      settings: {},
    }
  },
  methods: {
    randomLock(max) {
      const n = Math.floor(Math.random() * max);
      this.lock.lock = n < 1000 ?
        `0${n}` : n < 100 ?
          `00${n}` : n < 10 ?
            `000${n}` : n;

      this.lock.lock = this.lock.lock.toString();
      this.boxes = this.lock.lock.split('').map(Number);
    },
    async deleteLock() {
      const response = await this.callEndpoints(
        this.axios,
        'delete',
        `/locks/${this.id}`, localStorage.token
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
          text: response?.data?.deleted  === true ? 'Clave eliminada correctamente.' : 'Ocurrio un error',
          type: 'success',
          show: true,
        }
      }

      this.$router.push({ name: 'locks' });

    },
    async save() {
      this.errors = this.validateForm(this.validations, this.lock);

      if (Object.keys(this.errors).length > 0) {
        return false;
      }

      this.lock.lock = this.boxes.join('');

      console.log(this.lock);

      if (this.id && this.$route.name === 'lock-detail-edit') {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/locks/${this.id}`,
          localStorage.token,
          this.lock
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'locks' });
        }
      }
      else {
        const response = await this.callEndpoints(
          this.axios,
          'post',
          '/locks/',
          localStorage.token,
          this.lock
        );

        if (response?.error) {
          this.message = {
            text: response.error.displayMsg,
            type: response.error.type,
            show: true,
          }
        }
        else {
          this.$router.push({ name: 'locks' });
        }
      }
    }
  },
  async mounted() {

    //Get a list of user to avoid repetition.
    let response = await this.callEndpoints(
      this.axios,
      'get',
      '/locks/all?limit=20&offset=0',
      localStorage.token
    );

    if (response?.error?.status === 401) {
      this.$router.push({ name: 'locks' });
    }
    else {
      this.usersUsed = response.data.map(l => l.userNumber);
    }

    if (this.id && this.$route.name === 'lock-detail-edit') {
      response = await this.callEndpoints(
        this.axios,
        'get',
        `/locks/${this.id}`,
        localStorage.token
      );

      this.lock = {...response.data};
      if (response?.error?.status === 401) {
        this.$router.push({ name: 'locks' });
      }
      else {
        this.lock = {...response.data};
      }

      this.boxes = this.lock.lock.split('');

      response = await this.callEndpoints(
        this.axios,
        'get',
        '/config',
        localStorage.token
      );
      if (response?.error?.status === 401) {
        this.$router.push({ name: 'home' });
      }
      else {
        this.settings = response.data;
        if (this.settings[0]) {
          this.settings = this.settings[0];
        }
      }
    }
  }
}
</script>
