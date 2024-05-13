import type { RouteRecordRaw } from 'vue-router'

import layout from '@/layout/index.vue'

import Home from '@/view/home/index.vue'
import customerRare from '@/view/customer-rare/index.vue'
import beverages from '@/view/beverages/index.vue'

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
        path: 'beverages',
        name: 'beverages',
        component: beverages
      },
    ]
  }
]

export default routes