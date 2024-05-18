<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { beverageTagOptions } from '@/material/options'

import { useBeveragesStore } from '@/pinia'

import { renderSelectTags } from '@/render/SelectTags'

const beverageStore = useBeveragesStore()

const { filterForm } = storeToRefs(beverageStore)
</script>

<template>
  <!-- view -->
  <div class="config-view">
    <!-- 名称 -->
    <n-input class="left" v-model:value="filterForm.searchName" clearable />
    <!-- 酒水标签 -->
    <n-select
      class="right"
      v-model:value="filterForm.selectBeverageTags"
      multiple
      :options="beverageTagOptions"
      :render-tag="renderSelectTags({ category: 'beverage' })"
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