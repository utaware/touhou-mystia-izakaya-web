<script setup lang="ts">
import { computed } from 'vue'

import type { TSpriteType } from '@/material'

import { getIndexWithName, spriteCountOptions } from '@/material'

const props = withDefaults(defineProps<{
  index?: number,
  type: TSpriteType,
  width?: number,
  height?: number,
  size?: number,
  title?: string,
  name?: string,
}>(), {
  index: 0,
  width: 32,
  height: 32,
  title: '',
  name: '海鲜味噌汤',
})

const count = 10

const computedStyles = computed(() => {
  const { index, type, width, height, size, name } = props
  const total = spriteCountOptions[type]
  const relIndex = index || getIndexWithName(type, name)
  const x = relIndex % count
  const y = Math.floor(relIndex / count)
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
.customer-normal {
  background-image: url('@/assets/sprite/character-normal-sprite.webp');
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