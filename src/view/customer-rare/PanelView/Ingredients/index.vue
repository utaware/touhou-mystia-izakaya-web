<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useIngredientsStore } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

const ingredientsStore = useIngredientsStore()

const { addSelectRecipeIngredients } = ingredientsStore

const { getVariousIngredients } = storeToRefs(ingredientsStore)
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <!-- view -->
    <ul class="ingredients-view">
      <!-- 正常料理 -->
      <li
        class="item"
        v-for="(item, index) in getVariousIngredients.normal"
        :key="index"
        @click="addSelectRecipeIngredients(item.name)"
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
    <!-- 分割线 -->
    <n-divider>前方可是地狱</n-divider>
    <!-- 黑暗料理 -->
    <ul class="ingredients-view">
      <li
        class="item"
        v-for="(item, index) in getVariousIngredients.danger"
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