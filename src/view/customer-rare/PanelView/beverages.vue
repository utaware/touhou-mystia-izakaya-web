<script setup lang="ts">
import { computed } from 'vue'

import { useBeveragesStore, TCustomerRare } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

import { orderBy } from 'lodash'

import { getMatchResult } from '@/utils'

const beveragesStore = useBeveragesStore()

const props = defineProps<{
  customer: TCustomerRare
}>()

const recipes = computed(() => {
  return orderBy(beveragesStore.beverages.map((item) => {
    const { beverage_tags } = props.customer
    const { beverage_tags: customer_tags } = item
    const { isMatch: beverage_match_tags } = getMatchResult(customer_tags, beverage_tags)
    const value = beverage_match_tags.length
    const text = String(value)
    return { ...item, beverage_match_tags, value, text }
  }), ['value'], ['desc'])
})
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <!-- view -->
    <ul class="beverages-view">
      <li
        class="item"
        v-for="(item, index) in recipes"
        :key="index"
      >
        <n-badge
          :value="item.text"
          show-zero
          type="error"
        >
          <sprite-item
            :index="item.index"
            :width="64"
            :height="64"
            :title="item.name"
            type="beverages"
          />
        </n-badge>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.beverages-view {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, 64px);
  justify-content: space-between;
}
</style>