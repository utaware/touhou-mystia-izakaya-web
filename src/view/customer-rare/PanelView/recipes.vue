<script setup lang="ts">

import { useRecipesStore } from '@/pinia'

const recipesStore = useRecipesStore()

const { recipes } = recipesStore

type TSpriteOptions = {
  index: number,
  count?: number,
  width?: number,
  height?: number,
  total?: number
}

const calcSpriteLayout = ({
  index,
  count = 10,
  width = 44,
  height = 42,
  total = 165,
}: TSpriteOptions) => {
  const x = index % count
  const y = Math.floor(index / count)
  const reSizeX = 10 * width
  const reSizeY = Math.ceil(total / 10) * height
  return {
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${reSizeX}px ${reSizeY}px`,
    backgroundPosition: `-${x * width}px -${y * height}px`,
  }
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <!-- view -->
    <ul class="recipes-list">
      <li
        class="item"
        v-for="(item, index) in recipes"
        :key="index"
      >
        <!-- <n-badge :value="item.match_count" type="info"> -->
          <i :style="calcSpriteLayout({index})" class="recipes-sprite-item" :title="item.name"></i>
        <!-- </n-badge> -->
        <!-- <span>{{ item.name }}</span> -->
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.recipes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .recipes-sprite-item {
    display: inline-block;
  }
}
</style>