<script setup lang="ts">
import type { TIngredientsItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

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
      <sprite-item
        :index="item.index"
        :width="48"
        :height="48"
        :title="item.name"
        type="ingredients"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('./style/index.scss');
</style>