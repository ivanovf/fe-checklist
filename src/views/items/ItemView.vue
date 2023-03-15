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
  <div v-else>
    <h1 class="text-3xl mt-4">{{ item.label }}</h1>
    <text-field label="Item" v-model="item.label" name="item" inputId="item-label" />
    <div class="text-left my-4">
      <text-area-field inputId="item-description" name="description" label="¿Qué revisar?" v-model="item.description"></text-area-field>
    </div>
    <div class="text-left my-4">
      <label for="item-status" class="font-bold w-full mr-2">¿Debería revisarlo en la próxima reserva?</label>
      <input type="checkbox" name="status" id="item-status" v-bind:checked="item.status" v-model="item.status"/>
    </div>
    <div>
      <h3 class="my-4 text-xl font-bold">Categoría</h3>
      <ul class="grid grid-cols-2 gap-2 mb-4">
        <li v-for="cat in categories" v-bind:key="cat.name">
          <a href="#" v-on:click.prevent="item.category = cat.name" :class="{
            'border-2': true,
            'rounded-md': true,
            flex: true,
            'flex-row': true,
            'bg-cyan-600': item.category == cat.name,
            'p-2': true,
            'font-bold': item.category == cat.name,
            'text-white': item.category == cat.name,
           }">
            <img :src="getImageUrl(cat.name)" width="25" alt="" :class="{
              'mr-4': true,
              'svg-selected': item.category == cat.name,
             }">
            <span>
              {{ cat.label }}
            </span>
          </a>
        </li>
      </ul>
    </div>
    <button v-on:click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>

  </div>
</template>

<script>
import textField from '@/components/fields/TextField'
import TextAreaField from '@/components/fields/TextAreaField'

export default {
  components: { textField, TextAreaField },
  props:['id'],
  data() {
    return {
      item: {
        status: false
      },
      categories: [
        {
          name: 'bathroom',
          label: 'Baño'
        },
        {
          name: 'bedroom',
          label: 'Habitaciones'
        },
        {
          name: 'diningroom',
          label: 'Comedor'
        },
        {
          name: 'kitchenroom',
          label: 'Cocina'
        },
        {
          name: 'livingroom',
          label: 'Sala'
        },
        {
          name: 'washingroom',
          label: 'Lavado'
        }
      ]
    }
  },
  methods: {
    getImageUrl(filename) {
      return require(`@/assets/icons/${filename}.svg`)
    },
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
          '/items/',
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
<style>
.svg-selected {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}
</style>
