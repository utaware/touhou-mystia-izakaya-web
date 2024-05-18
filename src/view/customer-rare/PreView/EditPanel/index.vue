<script setup lang="ts">
import { storeToRefs } from 'pinia'

import {
  useRecipesStore,
  useBeveragesStore,
  useCustomerRareStore,
} from '@/pinia'

import SpritePending from '@/components/common/sprite/pending.vue'
import IconAdd from '@/components/common/icon/add.vue'
import IngredientsList from './ingredientsList.vue'

import { useCustomerActiveTab } from '@/hooks/customer-tabs'

const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()
const customerStore = useCustomerRareStore()

const { saveBookmark } = customerStore
const { getSaveButtonIsDisabled: disabled } = storeToRefs(customerStore)
const { currentRecipe } = storeToRefs(recipesStore)
const { currentBeverageName } = storeToRefs(beveragesStore)

const { setActiveTabName } = useCustomerActiveTab()
</script>

<template>
  <n-card>
    <div class="edit-panel">
      <!-- preview -->
      <n-space align="center" class="config">
        <!-- 料理 -->
        <sprite-pending
          type="tools"
          :name="currentRecipe?.tool"
          :size="36"
        />
        <sprite-pending
          type="recipes"
          :name="currentRecipe?.name"
          :size="48"
          @click="() => setActiveTabName('recipes')"
        />
        <!-- + -->
        <IconAdd />
        <!-- 酒水 -->
        <sprite-pending
          type="beverages"
          :name="currentBeverageName"
          :size="48"
          @click="() => setActiveTabName('beverages')"
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
        :disabled="disabled"
        @click="saveBookmark"
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