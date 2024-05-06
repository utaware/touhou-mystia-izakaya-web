<script setup lang="ts">
import { computed } from 'vue'

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

const { currentRecipeIngredients } = storeToRefs(recipesStore)
const { selectRecipeIngredients } = storeToRefs(ingredientsStore)

const { removeSelectRecipeIngredients } = ingredientsStore

const emptyCount = computed(() => {
  return 5 - currentRecipeIngredients.value.length - selectRecipeIngredients.value.length
})
</script>

<template>
  <!-- 菜谱 √ -->
  <div class="ingredients">
    <n-space>
      <!-- 菜谱 -->
      <sprite-pending
        v-for="(item, index) in currentRecipeIngredients"
        type="ingredients"
        :item="item"
        :key="`recipe-${index}`"
        :size="size"
      />
      <!-- 可选 -->
      <sprite-pending
        v-for="(item, index) in selectRecipeIngredients"
        type="ingredients"
        :item="item"
        :key="`ingredient-${index}`"
        :size="size"
        @click="removeSelectRecipeIngredients(index)"
      />
      <!-- 占位 -->
      <sprite-unknow
        v-for="item in emptyCount"
        :key="`unknow-${item}`"
        :size="size"
      />
    </n-space>
  </div>
</template>

<style scoped lang="scss">
</style>