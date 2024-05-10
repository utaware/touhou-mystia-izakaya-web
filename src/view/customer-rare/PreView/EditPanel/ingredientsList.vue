<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, useIngredientsStore } from '@/pinia'

import SpriteUnknow from '@/components/common/sprite/unknow.vue'
import SpritePending from '@/components/common/sprite/pending.vue'

withDefaults(defineProps<{
  size?: number,
}>(), {
  size: 48,
})

const recipesStore = useRecipesStore()
const ingredientsStore = useIngredientsStore()

const { currentRecipeIngredients, currentRecipeEmptyCount } = storeToRefs(recipesStore)
const { extraIngredientsNames } = storeToRefs(ingredientsStore)

const { removeExtraIngredients } = ingredientsStore
</script>

<template>
  <!-- 菜谱 √ -->
  <div class="ingredients">
    <n-space>
      <!-- 菜谱 -->
      <sprite-pending
        v-for="(item, index) in currentRecipeIngredients"
        type="ingredients"
        :name="item"
        :key="`recipe-${index}`"
        :size="size"
      />
      <!-- 可选 -->
      <sprite-pending
        v-for="(item, index) in extraIngredientsNames"
        type="ingredients"
        :name="item"
        :key="`ingredient-${index}`"
        :size="size"
        @click="removeExtraIngredients(index)"
      />
      <!-- 占位 -->
      <sprite-unknow
        v-for="item in currentRecipeEmptyCount"
        :key="`unknow-${item}`"
        :size="size"
      />
    </n-space>
  </div>
</template>

<style scoped lang="scss">
</style>