<script setup lang="ts">
import { reactive, computed } from 'vue'

import { beverages } from '@/material'

import { useBeveragesStore } from '@/pinia'

import { calcMatchTags } from '@/utils'

const beveragesStore = useBeveragesStore()

const { allBeverageTags } = beveragesStore

const state = reactive({
  beverages,
  beverageCheckItems: allBeverageTags,
  checkAll: false,
})

const handleClickReset = () => {
  state.beverageCheckItems = []
}

const filterBeverages = computed(() => {
  const checkItems = state.beverageCheckItems
  return beveragesStore.getBeveragesWithTag(checkItems).map((v) => {
    return { ...v, ...calcMatchTags(v.beverage_tags, checkItems) }
  }).sort((a, b) => {
    const [m, n] = [a, b].map((v) => v.match_tags.length)
    return n - m
  })
})

console.log('refresh')
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- filter -->
      <n-button @click="handleClickReset">清除</n-button>
      <n-checkbox-group v-model:value="state.beverageCheckItems">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="(item, index) in allBeverageTags"
            :key="index"
            :label="item"
            :value="item"
          />
        </n-space>
      </n-checkbox-group>
      <n-divider />
      <!-- content -->
      <ul class="beverages-list">
        <li
          class="item"
          v-for="(item, index) in filterBeverages"
          :key="index"
        >
          <n-badge :value="item.match_count">
            <i :class="item.namePY" class="beverages-sprite"></i>
          </n-badge>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.beverages-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 84px);
  gap: 24px;
  justify-content: space-between;
  .item {
    font-weight: bolder;
    text-align: center;
    font-size: 12px;
  }
}
</style>