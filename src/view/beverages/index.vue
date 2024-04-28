<script setup lang="ts">
import { reactive, computed } from 'vue'

import { beverages, beverageTags, type TBeverages } from '@/material'

const state = reactive({
  beverages,
  beverageTags,
  beverageCheckItems: [],
  checkAll: false,
})

const handleClickItem = (item: TBeverages) => {
  console.log(item)
}

const filterBeverages = computed(() => {
  const checkItems = state.beverageCheckItems
  return beverages.filter(({ beverage_tags }) => {
    const compose = new Set([...beverage_tags, ...checkItems])
    return beverage_tags.length === compose.size
  })
})
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- filter -->
      <n-checkbox v-model:checked="state.checkAll">全部</n-checkbox>
      <n-checkbox-group v-model:value="state.beverageCheckItems">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="(item, index) in state.beverageTags"
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
          @click="handleClickItem(item)"
        >
          <i :class="item.namePY" class="beverages-sprite"></i>
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