<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

import { storeToRefs } from 'pinia'

import { useIngredientsStore, useRecipesStore, useCustomerRareStore } from '@/pinia'

import type { TCustomerRare } from '@/material'
import type { TMatchIngredientsItem } from '@/utils/ingredients'

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

const handleViewIngredients = ({
  item, customer, recipe, count,
} : {
  item: TMatchIngredientsItem,
  customer: TCustomerRare,
  recipe: string,
  count: number,
}) => {
  if (!(recipe && count)) {
    return false
  }
  const options = createNotification(item, customer)
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
      <sprite-item
        :index="item.index"
        :size="48"
        :title="item.name"
        type="ingredients"
        @click="handleViewIngredients({
          item,
          customer: currentCustomer,
          recipe: currentRecipeName,
          count: currentRecipeEmptyCount,
        })"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('./style/index.scss');
</style>