<template>
  <div>
    <h1 class="mt-4 p-2 text-xl font-bold">Todos los elementos</h1>
    <div
      class="m-2 max-w-sm p-4 border-b border-slate-300 items-center flex flex-wrap"
      v-for="item in items" v-bind:key="item._id">
      <div class="basis-1/6">
        <img :src="getImageUrl(item.category)" alt="" class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400">
      </div>
      <div class="flex-auto">
        <a href="#" v-on:click.prevent="collpased = item._id">
            <h5 class="ml-4 text-left font-semibold tracking-tight text-gray-900 dark:text-white">{{ item.label }}</h5>
        </a>
      </div>
      <div class="basis-auto flex flex-wrap">
        <router-link class="mr-2"
        :to="{ name: 'item-detail-edit', params: { id: item._id } }">
        <img src="@/assets/icons/edit.svg" width="25" alt="">
        </router-link>
        <router-link class="ml-2"
          :to="{ name: 'item-detail-delete', params: { id: item._id } }">
          <img src="@/assets/icons/delete.svg" width="25" alt="">
        </router-link>
      </div>
      <Transition name="fade">
        <div class="basis-full" v-show="collpased === item._id">
          <p class="text-left mb-3 font-normal text-gray-500 dark:text-gray-400">{{ item.description }}</p>
          <img v-if="item.status" src="@/assets/icons/check-green.svg" width="25" alt="">
          <img v-else src="@/assets/icons/check.svg" width="25" alt="">
        </div>
      </Transition>
    </div>
  </div>

  <plus-button route="item-detail-new"></plus-button>


</template>

<script>
import PlusButton from '@/components/atoms/PlusButton.vue';

export default {
  components: { PlusButton },
  data() {
    return {
      items: [],
      collpased: null,
    }
  },
  methods: {
    getImageUrl(filename) {
      return require(`@/assets/icons/${filename}.svg`)
    },
  },
  async mounted() {
    const response = await this.callEndpoints(this.axios, 'get', '/items/all?limit=10&offset=0', localStorage.token);
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'items' });
    }
    else {
      this.items = response.data;
    }
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
