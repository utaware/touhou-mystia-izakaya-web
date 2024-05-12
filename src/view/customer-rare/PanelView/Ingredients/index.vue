<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useIngredientsStore } from '@/pinia'

import DangerIngredients from './danger.vue'
import NormalIngredients from './normal.vue'

const ingredientsStore = useIngredientsStore()

const { getVariousIngredients } = storeToRefs(ingredientsStore)
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- view -->
    <n-notification-provider>
      <normal-ingredients :ingredients="getVariousIngredients.normal" />
    </n-notification-provider>
    <!-- 分割线 -->
    <n-divider>前方可是地狱</n-divider>
    <!-- 黑暗料理 -->
    <danger-ingredients :ingredients="getVariousIngredients.danger" />
  </div>
</template>

<style scoped lang="scss">

</style>