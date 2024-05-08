<script setup lang="ts">
import type { Tbookmark } from '@/pinia'

import { getIndexWithName, recipes } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

interface PropsType extends Tbookmark {
  size?: number;
}

const props = withDefaults(
  defineProps<PropsType>(),
  { size: 48 }
)

const index = getIndexWithName('recipes', props.recipe)

const item = recipes[index]

const recipe_ingredients = item.ingredients

const extra_ingredients = props.ingredients
</script>

<template>
  <n-space>
    <!-- 菜谱 -->
    <sprite-item
      v-for="(item, index) in recipe_ingredients"
      type="ingredients"
      :name="item"
      :key="`recipe-${index}`"
      :size="size"
      :title="item"
    />
    <!-- 可选 -->
    <sprite-item
      v-for="(item, index) in extra_ingredients"
      type="ingredients"
      :name="item"
      :key="`ingredient-${index}`"
      :size="size"
      :title="item"
    />
  </n-space>
</template>

<style scoped lang="scss">
</style>