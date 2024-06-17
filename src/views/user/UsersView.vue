<template>
  <div
    v-for="user in users" v-bind:key="user._id"
    class="flex flex-row p-4 h-24 items-center border-b border-slate-300">
    <div class="basis-1/5">
      <div class="w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 relative inline-flex items-center justify-center">
        <span class="font-medium text-gray-600 bg-slate-100 dark:text-gray-300">{{ initials(user.email) }}</span>
      </div>
    </div>
    <div class="basis-3/5 grow text-left ml-2">
      <p class="text-md">
        {{ user.email }}
      </p>
      <p class="text-xs">
        {{ user.name }}
      </p>
      <h3 class="text-xs">
        <span class="font-bold">Role: </span>
        <span class="italic">{{ user.role }}</span>
      </h3>
    </div>
    <div class="basis-1/5">
      <router-link
          :to="{ name: 'user-detail-delete', params: { id: user._id } }">
          <img src="@/assets/icons/delete.svg" width="25" alt="">
        </router-link>
    </div>
  </div>

  <plus-button route="user-detail-new"></plus-button>
</template>
<script>
import PlusButton from '@/components/atoms/PlusButton.vue';

export default {
  components: { PlusButton },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    initials(email) {
      return `${email[0]}${email[1]}`.toUpperCase();
    }
  },
  async mounted() {
    const response = await this.callEndpoints(this.axios, 'get', '/users/all?limit=10&offset=0', localStorage.token);
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'home' });
    }
    else {
      this.users = response.data;
    }
  }
}
</script>
