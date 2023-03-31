<template>
  <PageLayout>
    <template #header v-if="currentUser">
      <HeaderLayout :uid="currentUser.id"></HeaderLayout>
      <div v-show="message.text"
        :class="{
          'bg-lime-300': true,
          'p-4 my-8': true,
          [message.type]: true
        }">
        {{ message }}
      </div>
    </template>
    <template #body>
      <div class="container mx-auto px-4">
        <router-view ></router-view>
      </div>
    </template>
    <template #footer v-if="currentUser">
      <FooterLayout></FooterLayout>
    </template>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/layouts/PageLayout';
import HeaderLayout from '@/components/layouts/HeaderLayout';
import FooterLayout from '@/components/layouts/FooterLayout.vue';

  export default {
    inject: ['message'],
    components:{
      PageLayout,
      HeaderLayout,
      FooterLayout,
    },
    data() {
      return {
        settings: {}
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser??null;
      }
    },
    methods: {
      logOut() {
        localStorage.clear();
        this.$router.push({ name: 'login' });
      },
      async validSession() {
        try {
          const res = await this.axios.get(
            `${process.env.VUE_APP_BE_HOST}/login/validate`,
            { headers: {'Authorization': `Bearer ${ localStorage.token }`} });
          if(res.data.access) {
            this.$store.commit('setCurrentUser', res.data.user);
            return true;
          }
          return false;
        }
        catch(error) {
          return false;
        }
      }
    },
    async mounted() {
      if (!localStorage.token) {
        this.logOut();
      }
      else {
        const validate = await this.validSession();

          const response = await this.callEndpoints(
          this.axios,
          'get',
          '/config',
          localStorage.token
        );

        if (response?.error?.status === 401) {
          this.$router.push({ name: 'home' });
        }
        else {
          if (response.data[0]) {
            this.settings = response.data[0];
          }
        }

        if (!validate) {
          this.logOut();
        }
      }
    }
  }
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
