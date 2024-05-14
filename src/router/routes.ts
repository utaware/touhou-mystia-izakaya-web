import type { RouteRecordRaw } from 'vue-router'

import layout from '@/layout/index.vue'

import Home from '@/view/home/index.vue'
import customerRare from '@/view/customer-rare/index.vue'
import recipes from '@/view/recipes/index.vue'
import beverages from '@/view/beverages/index.vue'
import ingredients from '@/view/ingredients/index.vue'

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
        component: customerRare
      },
      {
        path: 'recipes',
        name: 'recipes',
        component: recipes
      },
      {
        path: 'beverages',
        name: 'beverages',
        component: beverages
      },
      {
        path: 'ingredients',
        name: 'ingredients',
        component: ingredients
      },
    ]
  }
]

export default routes