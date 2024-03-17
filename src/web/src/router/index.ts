import { createRouter, createWebHistory } from 'vue-router'
import GettingStartedWithImages from '../views/GettingStartedWithImages.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/getting-started-with-images',
      name: 'gettingStartedWithImages',
      component: GettingStartedWithImages
    },

    {
      path: '/roi',
      name: 'roi',
      component: import('../views/RoiView.vue')
    },
    {
      path: '/edge-detection',
      name: 'edge-detection',
      component: import('../views/EdgeDetectionView.vue')
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
