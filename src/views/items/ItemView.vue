<template>
  <div v-if="$route.name === 'item-detail-delete'">
    <h2>¿Esta seguro de eliminar este item?</h2>
    <button
      v-on:click="deleteItem"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded">
      Eliminar
    </button>
    <router-link :to="{ name: 'items' }" >
      Cancelar
    </router-link>
  </div>
  <div v-else class="mt-8 p-4">
    <h1 class="text-3xl mt-4">{{ item.label }}</h1>
    <div class="text-left my-4">
      <label for="label" class="font-bold mr-2">Item:</label>
      <input type="text" name="label" id="item-label" v-model="item.label"  class="border-2 rounded w-full"/>
    </div>
    <div class="text-left my-4">
      <label for="description" class="font-bold">¿Que revisar?</label>
      <textarea name="description" id="item-description" cols="30" rows="3" class="border-2 rounded w-full" v-model="item.description"></textarea>
    </div>
    <div class="text-left my-4">
      <label for="item-status" class="font-bold w-full mr-2">¿Debería revisarlo en la próxima reserva?</label>
      <input type="checkbox" name="status" id="item-status" v-bind:checked="item.status" v-model="item.status"/>
    </div>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

  </div>
</template>

<script>
export default {
  props:['id'],
  data() {
    return {
      item: {
        status: false
      },
    }
  },
  methods: {
    async deleteItem() {
      const response = await this.callEndpoints(
        this.axios,
        'delete',
        `/items/${this.id}`, localStorage.token
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

      this.$router.push({ name: 'items' });

    },
    async save() {
      if (this.id && this.$route.name === 'item-detail-edit') {
        const response = await this.callEndpoints(
          this.axios,
          'put',
          `/items/${this.id}`,
          localStorage.token,
          this.item
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
      else {
        const response = await this.callEndpoints(
          this.axios,
          'post',
          `/items/${this.id}`,
          localStorage.token,
          this.item
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
    if (this.id && this.$route.name === 'item-detail-edit') {
      const response = await this.callEndpoints(
        this.axios,
        'get',
        `/items/${this.id}`,
        localStorage.token
      );

      this.item = {...response.data};
      console.log(this.item);
      if (response?.error?.status === 401) {
        this.$router.push({ name: 'items' });
      }
      else {
        this.item = {...response.data};
      }
    }
  }
}
</script>
