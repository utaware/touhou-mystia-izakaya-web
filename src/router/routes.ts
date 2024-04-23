import type { RouteRecordRaw } from 'vue-router'

import layout from '@/layout/index.vue'

import character from '@/view/character/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/character',
    children: [
      {
        path: '/character',
        name: 'character',
        component: character
      }
    ]
  }
]

export default routes