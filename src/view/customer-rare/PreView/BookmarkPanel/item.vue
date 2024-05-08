<script setup lang="ts">
import { useCustomerRareStore } from '@/pinia'
import type { Tbookmark } from '@/pinia'

import IconAdd from '@/components/common/icon/add.vue'
import SpriteItem from '@/components/common/sprite/index.vue'
import IngredientsList from './ingredients.vue'

interface propsType extends Tbookmark {
  size: number;
}

const props = defineProps<propsType>()

const customerStore = useCustomerRareStore()

const { deleteBookmark } = customerStore
</script>

<template>
  <div class="container">
    <!-- preview -->
    <n-space>
      <!-- 料理 -->
      <sprite-item
        type="recipes"
        :name="recipe"
        :size="size"
        :title="recipe"
      />
      <!-- + -->
      <IconAdd />
      <!-- 酒水 -->
      <sprite-item
        type="beverages"
        :name="beverage"
        :size="size"
        :title="beverage"
      />
      <!-- + -->
      <IconAdd />
      <!-- 食材 -->
      <IngredientsList v-bind="props" />
    </n-space>
    <!-- handler -->
    <n-space>
      <n-button secondary type="error" @click="deleteBookmark(uuid)">删除</n-button>
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