<template>
  <header class="bg-yellow-300 shadow">
    <nav>
      <div class="container">
        <div class="flex justify-between items-center">
          <router-link to="/" class="logo">
            <img src="@/assets/logos/logo.svg" alt="Logo" />
          </router-link>
          <div class="text-lg font-semibold text-gray-700">
            <h1><span>Check</span>List</h1>
          </div>
          <div class="flex items-center">
            <div class="sm:hidden">
              <button
                @click="toggleMenu"
                class="text-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isMenuOpen" class="sm:hidden">
        <ul>
          <li class="hover:bg-gray-200 text-left">
            <router-link
              :to="{ name: 'user-detail-edit', params: { id: uid } }"
              class="text-md text-gray-700 p-2 block"
              @click="toggleMenu"
            >
              <img
                src="@/assets/icons/profile.svg"
                class="icon inline mr-2"
                alt=""
              />
              <span>My Profile</span>
            </router-link>
          </li>
          <li class="hover:bg-gray-200 text-left">
            <router-link
              v-if="role === 'admin'"
              to="/users"
              class="text-md text-gray-700 p-2 block"
              @click="toggleMenu"
            >
              <img
                src="@/assets/icons/users.svg"
                class="icon inline mr-2"
                alt=""
              />
              <span>Users</span>
            </router-link>
          </li>
          <li class="hover:bg-gray-200 text-left">
            <router-link
              v-if="role === 'admin'"
              :to="{ name: 'settings' }"
              class="text-md text-gray-700 p-2 block"
              @click="toggleMenu"
            >
              <img
                src="@/assets/icons/settings.svg"
                class="icon inline mr-2"
                alt=""
              />
              <span class="tracking-wide">Settings</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="bg-gray-200 p-3" v-if="$route.matched[0]?.meta?.title">
    <h2 class="text-xl font-medium">
      {{ $route.matched[0].meta.title }}
    </h2>
  </div>
</template>
  <script>
export default {
  props: ["uid", "role"],
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
  <style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

header {
  width: 100vw;
}
.logo {
  width: 48px;
}
h1 {
  font-size: 1.4rem;
  color: dodgerblue;
}
h1 span {
  color: green;
}

.icon {
  width: 25px;
}
</style>
