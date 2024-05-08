<script setup lang="ts">
import { Tbookmark } from '@/pinia'

import IconAdd from '@/components/common/icon/add.vue'
import SpriteItem from '@/components/common/sprite/index.vue'
import IngredientsList from './ingredients.vue'

const props = defineProps<Tbookmark>()
</script>

<template>
  <div class="container">
    <!-- preview -->
    <n-space>
      <!-- 料理 -->
      <sprite-item
        type="recipes"
        :name="recipe"
        :size="48"
        :title="recipe"
      />
      <!-- + -->
      <IconAdd />
      <!-- 酒水 -->
      <sprite-item
        type="beverages"
        :name="beverage"
        :size="48"
        :title="beverage"
      />
      <!-- + -->
      <IconAdd />
      <!-- 食材 -->
      <IngredientsList v-bind="props" />
    </n-space>
    <!-- handler -->
    <n-space>
      <n-button secondary type="error">删除</n-button>
      <n-button secondary type="primary">选择</n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>