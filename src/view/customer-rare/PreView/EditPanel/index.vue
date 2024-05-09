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

const { saveBookmark,  } = customerStore
const { currentCustomer } = storeToRefs(customerStore)
const { currentRecipeName } = storeToRefs(recipesStore)
const { currentBeverageName } = storeToRefs(beveragesStore)
const { selectRecipeIngredients } = storeToRefs(ingredientsStore)

const saveButtonDisabled = computed(() => {
  return !(currentBeverageName.value && currentRecipeName.value)
})

const handleClickSave = () => {
  // 顾客 + 菜谱 + 酒水 + 食材
  const ingredients = selectRecipeIngredients.value
  const customerName = currentCustomer.value.name
  const uuid = generatorUid()
  const bookmark = {
    customer: customerName,
    recipe: currentRecipeName.value,
    beverage: currentBeverageName.value,
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
          :name="currentRecipeName"
          :size="48"
        />
        <!-- + -->
        <IconAdd />
        <!-- 酒水 -->
        <sprite-pending
          type="beverages"
          :name="currentBeverageName"
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