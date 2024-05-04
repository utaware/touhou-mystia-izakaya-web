<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore } from '@/pinia'

const recipesStore = useRecipesStore()

const { currentRecipe } = storeToRefs(recipesStore)
</script>

<template>
  <n-card class="edit-panel">
    <div class="config">
      <span class="unknow"></span>
    </div>
  </n-card>
</template>

<style scoped lang="scss">
.unknow {
  display: inline-block;
  width: 64px;
  height: 64px;
  background: url('@/assets/unknown.jpg') no-repeat;
  background-size: cover;
}
</style>