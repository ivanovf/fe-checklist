<template>
  <h1 class="mt-4 p-2 text-xl font-bold">Lista de usuarios</h1>

  <div class="list-wrapper">
    <ul class="list">
      <li class="list-item" v-for="user in users" v-bind:key="user._id">
        <div class="list-item-content">
          <h4>{{ user.email }}</h4>
          <p>{{ user.role }}</p>
        </div>
        <router-link class="mr-2"
          :to="{ name: 'user-detail-edit', params: { id: user._id } }">
          <img src="@/assets/icons/edit.svg" width="25" alt="">
        </router-link>
        <router-link class="ml-2"
          :to="{ name: 'user-detail-delete', params: { id: user._id } }">
          <img src="@/assets/icons/delete.svg" width="25" alt="">
        </router-link>
      </li>
    </ul>
  </div>
  <div class="p-8 flex flex-row-reverse sticky bottom-12">
  <router-link
    :to="{ name: 'user-detail-new' }"
    class="p-2 w-12 h-12 border-2 rounded-full bg-slate-100 order-black overflow-hidden" >
    <img src="@/assets/icons/plus.svg" alt="">
  </router-link>
</div>
</template>
<script>

export default {
  data() {
    return {
      users: [],
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
