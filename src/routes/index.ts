import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShopView from '@/views/ShopView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductsByCategoryView from '@/views/ProductsByCategoryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/shop', component: ShopView },
    { path: '/products', component: ProductsView },
    { path: '/products/:productId', component: ProductView },
    { path: '/products/category/:categoryName', component: ProductsByCategoryView }
  ]
})

export default router
