import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductCatalogue from '@/views/Products.vue'
/* import ProductView from '@/views/ProductView.vue'
import NewProductView from '@/views/NewProductView.vue'
import EditProductView from '@/views/EditProductView.vue' */

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: ProductCatalogue
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
