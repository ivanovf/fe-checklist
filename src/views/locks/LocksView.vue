<template>
  <div>
    <div
      class="m-2 max-w-sm p-4 border-b border-slate-300 locks-center flex flex-wrap"
      v-for="lock in locks" v-bind:key="lock._id">
      <div class="py-2 border-2 rounded-ls border-black-400 w-8 h-8 leading-4 font-bold">{{ lock.userNumber }}</div>
      <div class="grid grid-cols-4 gap-2 w-1/2 mx-auto">
        <div v-for="v, i in 4" :key="i" class="p-2 border-2 rounded-md border-red-400 w-8 h-8 leading-4 font-bold">
          {{ lock.lock.charAt(i) }}
        </div>
      </div>
      <div class="basis-auto flex flex-wrap">
        <router-link class="mr-2"
        :to="{ name: 'lock-detail-edit', params: { id: lock._id } }">
        <img src="@/assets/icons/edit.svg" width="25" alt="">
        </router-link>
        <router-link class="ml-2"
          :to="{ name: 'lock-detail-delete', params: { id: lock._id } }">
          <img src="@/assets/icons/delete.svg" width="25" alt="">
        </router-link>
      </div>
    </div>
  </div>
  <plus-button route="lock-detail-new"></plus-button>

</template>

<script>
import PlusButton from '@/components/atoms/PlusButton.vue';

export default {
  components: { PlusButton },
  data() {
    return {
      locks: [],
    }
  },
  methods: {
    getImageUrl(filename) {
      return require(`@/assets/icons/${filename}.svg`)
    },
  },
  async mounted() {
    const response = await this.callEndpoints(this.axios, 'get', '/locks/all?limit=10&offset=0', localStorage.token);
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'locks' });
    }
    else {
      this.locks = response.data;
    }
  }
}
</script>
