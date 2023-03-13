import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/user/UsersView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/users/:id/edit',
    name: 'user-detail-edit',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/users/:id/delete',
    name: 'user-detail-delete',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/users/new',
    name: 'user-detail-new',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('@/views/items/ItemsView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/items/:id/edit',
    name: 'item-detail-edit',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/items/:id/delete',
    name: 'item-detail-delete',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/items/new',
    name: 'item-detail-new',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('@/views/reservations/ReservationsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reservations/:id/edit',
    name: 'reservation-edit',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/:id/delete',
    name: 'reservation-delete',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/:id/validate',
    name: 'validate-checklist',
    component: () => import('@/views/reservations/ValidateChecklist.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/new',
    name: 'reservation-new',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '@/views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const validSession = async () => {
  try {
    const res = await axios.get(
      `${process.env.VUE_APP_BE_HOST}/login/validate`,
      { headers: {'Authorization': `Bearer ${ localStorage.token }`} });
      if(res.data.access) {
        return true;
      }
  }
  catch(error) {
    return false;
  }
}

const logOut = () => {
  localStorage.clear();
  router.push('/login');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.token
    if (!token || !validSession()) {
      logOut();
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
