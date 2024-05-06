<script setup lang="ts">
import { computed } from 'vue'

import type { TSpriteType } from '@/utils/tag'

const props = withDefaults(defineProps<{
  index: number,
  type?: TSpriteType,
  width?: number,
  height?: number,
  size?: number,
  title?: string,
}>(), {
  index: 0,
  type: 'recipes',
  width: 32,
  height: 32,
  title: '',
})

const typeOptions = {
  recipes: { total: 163 },
  beverages: { total: 46 },
  ingredients: { total: 61 },
  tools: { total: 5 },
}

const count = 10

const computedStyles = computed(() => {
  const { index, type, width, height, size } = props
  const { total } = typeOptions[type]
  const x = index % count
  const y = Math.floor(index / count)
  const w = size || width
  const h = size || height
  const reSizeX = Math.min(total, count) * w
  return {
    width: `${w}px`,
    height: `${h}px`,
    backgroundSize: `${reSizeX}px`,
    backgroundPosition: `-${x * w}px -${y * h}px`,
  }
})
</script>

<template>
  <span
    class="sprite"
    :class="type"
    :style="computedStyles"
    :title="title"
  ></span>
</template>

<style scoped lang="scss">
.sprite {
  display: inline-block;
  vertical-align: middle;
  background-repeat: no-repeat;
}
.recipes {
  background-image: url('@/assets/sprite/recipes-sprite.webp');
}
.beverages {
  background-image: url('@/assets/sprite/beverages-sprite.webp');
}
.ingredients {
  background-image: url('@/assets/sprite/ingredients-sprite.webp');
}
.tools {
  background-image: url('@/assets/sprite/tools-sprite.webp');
}
</style>