<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  index: number,
  type: 'recipes' | 'beverages' | 'ingredients' | 'tools',
  width: number,
  height: number,
}>()

const typeOptions = {
  recipes: { total: 163 },
  beverages: { total: 46 },
  ingredients: { total: 61 },
  tools: { total: 5 },
}

const count = 10

const computedStyles = computed(() => {
  const { index, type, width, height } = props
  const { total } = typeOptions[type]
  const x = index % count
  const y = Math.floor(index / count)
  const reSizeX = Math.min(total, count) * width
  return {
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${reSizeX}px`,
    backgroundPosition: `-${x * width}px -${y * height}px`,
  }
})
</script>

<template>
  <i class="sprite" :class="type" :style="computedStyles"></i>
</template>

<style scoped lang="scss">
.sprite {
  display: inline-block;
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