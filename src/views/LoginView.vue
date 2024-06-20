<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="@/assets/logos/logo.svg"
          alt="logo"
        />
        El Jardín
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >¿Olvidaste tu contraseña?</a
              >
            </div>
            <button
              v-on:click="login"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Sign in
            </button>

            <div v-if="error" class="text-red-600">El usuario o la contraseña no son correctos</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SplashScreen></SplashScreen>
</template>

<script>
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: "LoginView",
  components: {
    SplashScreen,
  },
  data: function () {
    return {
      userName: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async login() {

      try {
        const response = await this.callEndpoints(this.axios, 'post', '/login', null, {
          email: this.userName,
          password: this.password,
        });

        if (response.error) {
          this.error = true;
        }
        else {
          localStorage.setItem("token", response.data.access_token);
          this.$store.commit('setCurrentUser', response.data.user);
          this.$router.push("/");
        }
      } catch (error) {
        if (error.statusCode === 401) {
          this.$router.push({ name: 'login' });
        }
      }
    },
  },
};
</script>
