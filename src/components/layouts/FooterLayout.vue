<template>
    <nav class="mobile-nav">
        <router-link to="/" class="bloc-icon">
            <img src="@/assets/icons/home.svg" alt="">
        </router-link>
        <router-link to="/reservations" class="bloc-icon">
            <img src="@/assets/icons/date.svg" alt="">
        </router-link>
        <router-link :to="{ name: 'locks' }" class="bloc-icon">
            <img src="@/assets/icons/lock.svg" alt="">
        </router-link>
        <router-link to="/items" class="bloc-icon">
            <img src="@/assets/icons/items.svg" alt="">
        </router-link>
        <router-link to="/users" class="bloc-icon">
            <img src="@/assets/icons/users.svg" alt="">
        </router-link>
        <router-link :to="{ name: 'settings' }" class="bloc-icon">
            <img src="@/assets/icons/settings.svg" alt="">
        </router-link>
    </nav>
</template>

<style scoped>
.mobile-nav {
  background: #F1F1F1;
  position: fixed;
  bottom: 0;
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.bloc-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bloc-icon img {
  width: 30px;
}
</style>
