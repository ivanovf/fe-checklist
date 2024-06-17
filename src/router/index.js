import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '',
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    title: 'Usuarios',
    component: () => import('@/views/user/UsersView.vue'),
    meta: {
      title: 'Usuarios',
      requiresAuth: true
    },
  },
  {
    path: '/users/:id/edit',
    name: 'user-detail-edit',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      title: 'Editar perfil',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/users/:id/delete',
    name: 'user-detail-delete',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      title: 'Eliminar usuario',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/users/new',
    name: 'user-detail-new',
    component: () => import('@/views/user/UserView.vue'),
    meta: {
      title: 'Nuevo usuario',
      requiresAuth: true
    },
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('@/views/items/ItemsView.vue'),
    meta: {
      title: 'Elementos',
      requiresAuth: true
    },
  },
  {
    path: '/items/:id/edit',
    name: 'item-detail-edit',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      title: 'Editar elemento',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/items/:id/delete',
    name: 'item-detail-delete',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      title: 'Eliminar elemento',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/items/new',
    name: 'item-detail-new',
    component: () => import('@/views/items/ItemView.vue'),
    meta: {
      title: 'Nuevo elemento',
      requiresAuth: true
    },
  },
  {
    path: '/locks',
    name: 'locks',
    component: () => import('@/views/locks/LocksView.vue'),
    meta: {
      title: 'Claves para usuarios',
      requiresAuth: true
    },
  },
  {
    path: '/locks/:id/edit',
    name: 'lock-detail-edit',
    component: () => import('@/views/locks/LockView.vue'),
    meta: {
      title: 'Editar clave',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/locks/:id/delete',
    name: 'lock-detail-delete',
    component: () => import('@/views/locks/LockView.vue'),
    meta: {
      title: 'Eliminar clave',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/locks/new',
    name: 'lock-detail-new',
    component: () => import('@/views/locks/LockView.vue'),
    meta: {
      title: 'Nueva clave',
      requiresAuth: true
    },
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('@/views/reservations/ReservationsView.vue'),
    meta: {
      title: 'Reservas',
      requiresAuth: true
    }
  },
  {
    path: '/reservations/:id/edit',
    name: 'reservation-edit',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      title: 'Editar reserva',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/:id/delete',
    name: 'reservation-delete',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      title: 'Eliminar reserva',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/:id/validate',
    name: 'validate-checklist',
    component: () => import('@/views/reservations/ValidateChecklist.vue'),
    meta: {
      title: 'Validar reserva',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/reservations/new',
    name: 'reservation-new',
    component: () => import('@/views/reservations/ReservationView.vue'),
    meta: {
      title: 'Nueva reserva',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( '@/views/SettingsView.vue'),
    meta: {
      title: 'Configuración',
      requiresAuth: true
    }
  },
  {
    path: '/activity',
    name: 'activities',
    component: () => import( '@/views/activities/HomeActivitiesView.vue'),
    meta: {
      title: 'Actividades',
      requiresAuth: true
    }
  },
  {
    path: '/types/new',
    name: 'activity-types-new',
    component: () => import( '@/views/activities/TypeView.vue'),
    meta: {
      title: 'Actividades',
      requiresAuth: true
    }
  },
  {
    path: '/types/:id/edit',
    name: 'activity-types-edit',
    component: () => import('@/views/activities/TypeView.vue'),
    meta: {
      title: 'Editar actividad',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/types/:id/delete',
    name: 'activity-types-delete',
    component: () => import('@/views/activities/TypeView.vue'),
    meta: {
      title: 'Eliminar actividad',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/activity/new',
    name: 'activity-detail-new',
    component: () => import( '@/views/activities/ActivityView.vue'),
    meta: {
      title: 'Actividades',
      requiresAuth: true
    }
  },
  {
    path: '/activity/:id/edit',
    name: 'activity-detail-edit',
    component: () => import('@/views/activities/ActivityView.vue'),
    meta: {
      title: 'Editar actividad',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/activity/:id/delete',
    name: 'activity-detail-delete',
    component: () => import('@/views/activities/ActivityView.vue'),
    meta: {
      title: 'Eliminar actividad',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Iniciar sesión',
    }
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
      if (to.path.includes('/api')) {
        next(false)
      }
      else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
