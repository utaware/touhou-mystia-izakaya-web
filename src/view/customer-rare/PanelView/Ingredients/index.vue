<script setup lang="ts">
import { computed } from 'vue'

import { useIngredientsStore } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

const ingredientsStore = useIngredientsStore()

const ingredients = computed(() => {
  return ingredientsStore.ingredients
})
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <!-- view -->
    <ul class="ingredients-view">
      <li
        class="item"
        v-for="(item, index) in ingredients"
        :key="index"
      >
        <sprite-item
          :index="item.index"
          :width="48"
          :height="48"
          :title="item.name"
          type="ingredients"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.ingredients-view {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, 48px);
  justify-content: space-between;
}
</style>