<template>
  <PageLayout>
    <template #header>
      <HeaderLayout v-if="isValidToken"></HeaderLayout>
    </template>
    <template #body>
      <div
        v-show="message.show"
        :class="{
          'bg-lime-300': true,
          'p-4 m-8': true,
          [message.type]: true
        }">
        {{ message.text }}
      </div>
      <router-view ></router-view>
    </template>
    <template #footer v-if="isValidToken">
      <FooterLayout></FooterLayout>
    </template>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/layouts/PageLayout';
import HeaderLayout from '@/components/layouts/HeaderLayout';
import FooterLayout from '@/components/layouts/FooterLayout.vue';

  export default {
    components:{
      PageLayout,
      HeaderLayout,
      FooterLayout,
    },
    data() {
      return {
        isValidToken: false
      }
    },
    methods: {
      logOut() {
        localStorage.clear();
        this.$router.push('/login');
      },
      async validSession() {
        try {
          const res = await this.axios.get(
            `${process.env.VUE_APP_BE_HOST}/login/validate`,
            { headers: {'Authorization': `Bearer ${ localStorage.token }`} });
            if(res.data) {
              return true;
            }
          }
          catch(error) {
            return false;
          }
        }
      },
      mounted() {
        if(!this.validSession()) {
          this.logOut();
        }
        else{
          this.isValidToken = true;
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
