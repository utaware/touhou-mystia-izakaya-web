<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { positiveTagOptions } from '@/material/options'

import { useRecipesStore } from '@/pinia'

import { renderSelectTags } from '@/render/SelectTags'

const recipesStore = useRecipesStore()

const { filterForm } = storeToRefs(recipesStore)
</script>

<template>
  <!-- view -->
  <div class="config-view">
    <!-- 名称 -->
    <n-input class="left" v-model:value="filterForm.name" clearable />
    <!-- 酒水标签 -->
    <n-select
      class="right"
      v-model:value="filterForm.positiveTags"
      multiple
      :options="positiveTagOptions"
      :render-tag="renderSelectTags({ category: 'like' })"
      :max-tag-count="2"
      clearable
    />
  </div>
</template>

<style scoped lang="scss">
.config-view {
  display: grid;
  grid-template-areas: 'l m r';
  grid-template-columns: repeat(3, 1fr);
  .left {
    grid-area: l;
  }
  .right {
    grid-area: r;
  }
}
</style>