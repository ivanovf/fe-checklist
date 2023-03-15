<template>
    <header>
      <div class="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>
        <ul class="menu__box">
          <li><router-link class="menu__item" to="/">Home</router-link></li>
          <li><router-link class="menu__item" to="/users">Admin Users</router-link></li>
          <li><router-link class="menu__item" to="/items">Admin items</router-link></li>
          <li>
            <a class="menu__item" href="#" @click="logOut">
              Logout
            </a>
          </li>
          <li><router-link class="menu__item" to="/about">About</router-link></li>
        </ul>
      </div>

      <h1><span>Check</span>List</h1>
      <router-link to="/">
        <img src="@/assets/logos/logo.svg" alt="Logo"/>
      </router-link>
    </header>
  </template>
  <script>
  export default {
    methods: {
      reload() {
        location.reload();
      },
      logOut() {
        localStorage.removeItem('token');
        this.reload();
      }
    }
  }
  </script>
  <style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100vw;
    }
    img,
    span {
      margin: 10px;
      width: 48px;
    }
    h1 {
      font-size: 1.4rem;
      color: dodgerblue;
    }
    h1 span {
      color: green;
    }

    #menu__toggle {
    opacity: 0;
    }
    #menu__toggle:checked + .menu__btn > span {
      transform: rotate(45deg);
    }
    #menu__toggle:checked + .menu__btn > span::before {
      top: 0;
      transform: rotate(0deg);
    }
    #menu__toggle:checked + .menu__btn > span::after {
      top: 0;
      transform: rotate(90deg);
    }
    #menu__toggle:checked ~ .menu__box {
      left: 0 !important;
    }
    .menu__btn {
      position: absolute;
      top: 20px;
      left: 30px;
      width: 26px;
      height: 30px;
      cursor: pointer;
      z-index: 1;
    }
    .menu__btn > span,
    .menu__btn > span::before,
    .menu__btn > span::after {
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #616161;
      transition-duration: .25s;
    }
    .menu__btn > span::before {
      content: '';
      top: -8px;
    }
    .menu__btn > span::after {
      content: '';
      top: 8px;
    }
    .menu__box {
      display: block;
      position: fixed;
      top: 0;
      left: -100%;
      width: 300px;
      height: 100%;
      margin: 0;
      padding: 80px 0;
      list-style: none;
      background-color: #ECEFF1;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
      transition-duration: .25s;
    }
    .menu__item, router-link  {
      display: block;
      padding: 12px 24px;
      color: #333;
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      font-weight: 600;
      text-decoration: none;
      transition-duration: .25s;
    }
    .menu__item:hover, router-link:hover {
      background-color: #CFD8DC;
    }
  </style>
