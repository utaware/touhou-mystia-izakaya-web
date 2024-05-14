import type { RouteRecordRaw } from 'vue-router'

import layout from '@/layout/index.vue'

import Home from '@/view/home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'customer-rare',
        name: 'customer-rare',
        component: () => import('@/view/customer-rare/index.vue')
      },
      {
        path: 'recipes',
        name: 'recipes',
        component: () => import('@/view/recipes/index.vue')
      },
      {
        path: 'beverages',
        name: 'beverages',
        component: () => import('@/view/beverages/index.vue')
      },
      {
        path: 'ingredients',
        name: 'ingredients',
        component: () => import('@/view/ingredients/index.vue')
      },
    ]
  }
]

export default routes