<script setup lang="ts">
import { ref, computed } from 'vue'

import { useBeveragesStore } from '@/pinia'

import { getMatchResult } from '@/utils/tag'

import TagsItem from '@/components/common/tags/index.vue'

const beveragesStore = useBeveragesStore()

const { allBeverageTags } = beveragesStore

const beverageCheckTags = ref(allBeverageTags.map((value) => {
  return { value, checked: false }
}))

const filterBeverages = computed(() => {
  const checked_tags = beverageCheckTags.value.filter(v => v.checked).map(v => v.value)
  return beveragesStore.getBeveragesWithTag(checked_tags).map((v) => {
    return { ...v, ...getMatchResult(v.beverage_tags, checked_tags) }
  }).sort((a, b) => {
    const [m, n] = [a, b].map((v) => v.isMatch.length)
    return n - m
  })
})

const handleClickTags = (item: { value: string, checked: boolean }) => {
  item.checked = !item.checked
}

const handleClickReset = () => {
  beverageCheckTags.value.forEach(v => v.checked = false)
}
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- filter -->
      <!-- tags -->
      <n-space>
        <n-tag @click="handleClickReset">清除</n-tag>
        <tags-item
          v-for="(item, index) in beverageCheckTags"
          :key="index"
          :value="item.value"
          :class="{ disabled: !item.checked }"
          category="beverage"
          @click="handleClickTags(item)"
        />
      </n-space>
      <!-- divider -->
      <n-divider />
      <!-- content -->
      <ul class="beverages-list">
        <li
          class="item"
          v-for="(item, index) in filterBeverages"
          :key="index"
        >
          <n-badge :value="item.isMatch.length" type="info">
            <i :class="item.namePY" class="beverages-sprite-item"></i>
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
  gap: 16px;
  justify-content: space-between;
  .item {
    font-weight: bolder;
    text-align: center;
    font-size: 12px;
  }
}
</style>