import type { RouteRecordRaw } from 'vue-router'

import characterRare from '@/view/characterRare.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'characterRare',
    component: () => characterRare,
  }
]

export default routes