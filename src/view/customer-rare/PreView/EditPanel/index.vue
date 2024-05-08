<script setup lang="ts">
import { computed } from 'vue'

import { storeToRefs } from 'pinia'

import {
  useRecipesStore,
  useBeveragesStore,
  useCustomerRareStore,
  useIngredientsStore,
} from '@/pinia'

import { generatorUid } from '@/utils'

import SpritePending from '@/components/common/sprite/pending.vue'
import IconAdd from '@/components/common/icon/add.vue'
import IngredientsList from './ingredientsList.vue'

const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()
const customerStore = useCustomerRareStore()
const ingredientsStore = useIngredientsStore()

const { saveBookmark, currentCustomer: { name: customerName } } = customerStore
const { currentRecipe } = storeToRefs(recipesStore)
const { currentBeverage } = storeToRefs(beveragesStore)
const { selectRecipeIngredients } = storeToRefs(ingredientsStore)

const saveButtonDisabled = computed(() => {
  return !(currentRecipe.value && currentBeverage.value)
})

const handleClickSave = () => {
  // 顾客 + 菜谱 + 酒水 + 食材
  const recipeName = currentRecipe.value?.name || ''
  const beverageName = currentBeverage.value?.name || ''
  const ingredients = selectRecipeIngredients.value
  const uuid = generatorUid()
  const bookmark = {
    customer: customerName,
    recipe: recipeName,
    beverage: beverageName,
    ingredients,
    uuid,
  }
  saveBookmark(bookmark)
}
</script>

<template>
  <n-card>
    <div class="edit-panel">
      <!-- preview -->
      <n-space class="config">
        <!-- 料理 -->
        <sprite-pending
          type="recipes"
          :name="currentRecipe?.name"
          :size="48"
        />
        <!-- + -->
        <IconAdd />
        <!-- 酒水 -->
        <sprite-pending
          type="beverages"
          :name="currentBeverage?.name"
          :size="48"
        />
        <!-- + -->
        <IconAdd />
        <!-- 食材 -->
        <IngredientsList />
      </n-space>
      <!-- handle -->
      <n-button
        type="info"
        secondary
        :disabled="saveButtonDisabled"
        @click="handleClickSave"
      >
        保存
      </n-button>
    </div>
  </n-card>
</template>

<style scoped lang="scss">
.edit-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>