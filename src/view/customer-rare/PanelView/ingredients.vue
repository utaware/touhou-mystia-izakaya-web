<script setup lang="ts">
import { computed } from 'vue'

import { useIngredientsStore, TCustomerRare } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

const ingredientsStore = useIngredientsStore()

defineProps<{
  customer: TCustomerRare
}>()

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
          :width="64"
          :height="64"
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
  grid-template-columns: repeat(auto-fill, 64px);
  justify-content: space-between;
}
</style>