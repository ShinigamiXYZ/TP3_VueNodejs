import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductCatalogue from '@/views/Products.vue'
import EditForm from '@/components/EditForm.vue'
import LoginPage from '@/views/LoginPage.vue'

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
    path: '/catalogue',
    name: 'catalogue',
    component: ProductCatalogue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditForm,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: LoginPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('loggedIn')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
