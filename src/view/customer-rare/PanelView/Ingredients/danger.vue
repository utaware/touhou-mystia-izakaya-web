<script setup lang="ts">
import type { TIngredientsItem } from '@/material'

import { getPublicAssets } from '@/utils/pub-use'

defineProps<{
  ingredients: TIngredientsItem[]
}>()
</script>

<template>
  <!-- 黑暗料理 -->
  <ul class="ingredients-view">
    <li
      class="item"
      v-for="(item, index) in ingredients"
      :key="index"
    >
      <img width="48" :src="getPublicAssets('ingredients', item.name)" :alt="item.name" :title="item.name" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('./style/index.scss');
</style>