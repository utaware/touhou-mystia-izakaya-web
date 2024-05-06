<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, useBeveragesStore } from '@/pinia'

import SpritePending from '@/components/common/sprite/pending.vue'

const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()

const { currentRecipe } = storeToRefs(recipesStore)
const { currentBeverage } = storeToRefs(beveragesStore)

</script>

<template>
  <n-card class="edit-panel">
    <div class="config">
      <!-- 料理 -->
      <sprite-pending
        type="recipes"
        :item="currentRecipe"
        :size="48"
      />
      <!-- 酒水 -->
      <sprite-pending
        type="beverages"
        :item="currentBeverage"
        :size="48"
      />
    </div>
  </n-card>
</template>

<style scoped lang="scss">

</style>