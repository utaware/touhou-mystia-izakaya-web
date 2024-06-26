<script setup lang="ts">
import { computed } from 'vue'

import { createDiscreteApi } from 'naive-ui'

import { storeToRefs } from 'pinia'

import { useIngredientsStore, useRecipesStore, useCustomerRareStore } from '@/pinia'

import type { TCustomerRare, TMatchIngredientsItem } from '@/material'

import { createNotification } from './render/notification'

import SpriteItem from '@/components/common/sprite/index.vue'

const { notification } = createDiscreteApi(['notification'])

const customerStore = useCustomerRareStore()
const reipesStore = useRecipesStore()
const ingredientsStore = useIngredientsStore()

const { currentCustomer } = storeToRefs(customerStore)
const { currentRecipeName, currentRecipeEmptyCount } = storeToRefs(reipesStore)
const { addExtraIngredients } = ingredientsStore

defineProps<{
  ingredients: TMatchIngredientsItem[],
}>()

const handleActionClick = (name: string) => {
  addExtraIngredients(name)
  notification.destroyAll()
}

const isCanSelect = computed(() => {
  return Boolean(currentRecipeName.value && currentRecipeEmptyCount.value)
})

const handleViewIngredients = (
  item: TMatchIngredientsItem,
  customer: TCustomerRare,
) => {
  if (!isCanSelect.value) {
    return false
  }
  const options = createNotification({
    item,
    customer,
    handleActionClick,
  })
  notification.create(options)
}
</script>

<template>
  <ul class="ingredients-view">
    <!-- 正常料理 -->
    <li
      class="item"
      v-for="(item, index) in ingredients"
      :key="index"
    >
      <n-badge :value="item.badge_text" :show="isCanSelect" show-zero>
        <sprite-item
          :index="item.index"
          :size="48"
          :title="item.name"
          type="ingredients"
          @click="handleViewIngredients(item, currentCustomer)"
        />
      </n-badge>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('./style/index.scss');
</style>