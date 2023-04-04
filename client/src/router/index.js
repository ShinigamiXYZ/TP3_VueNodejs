import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductCatalogue from '@/views/Products.vue'
import EditForm from '@/components/EditForm.vue'

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
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditForm
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
