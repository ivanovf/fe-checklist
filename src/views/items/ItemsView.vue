<template>
  <div>
    <h1 class="mt-4 p-2 text-xl font-bold">Todos los elementos</h1>
    <div
      class="m-6 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-wrap"
      v-for="item in items" v-bind:key="item._id">
      <div class="basis-1/6">
        <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path>
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
        </svg>
      </div>
      <div class="flex-auto">
        <a href="#" v-on:click.prevent="collpased = item._id">
            <h5 class="mb-2 text-base font-semibold tracking-tight text-gray-900 dark:text-white">{{ item.label }}</h5>
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

  <div class="p-8 flex flex-row-reverse sticky bottom-12">
    <router-link
      :to="{ name: 'item-detail-new' }"
      class="p-2 w-12 h-12 border-2 rounded-full bg-slate-100 order-black overflow-hidden" >
      <img src="@/assets/icons/plus.svg" alt="">
    </router-link>
  </div>

</template>

<script>

export default {
  data() {
    return {
      items: [],
      collpased: null,
    }
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
