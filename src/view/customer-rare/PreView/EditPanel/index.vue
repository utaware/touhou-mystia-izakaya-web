<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, useBeveragesStore } from '@/pinia'

import SpritePending from '@/components/common/sprite/pending.vue'
import IconAdd from './iconAdd.vue'
import IngredientsList from './ingredientsList.vue'

const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()

const { currentRecipe } = storeToRefs(recipesStore)
const { currentBeverage } = storeToRefs(beveragesStore)

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
      <n-button type="info" secondary>保存</n-button>
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