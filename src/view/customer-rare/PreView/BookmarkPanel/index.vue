<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

import BookmarkItem from './item.vue'

const customerStore = useCustomerRareStore()

const { getCurrentBookmark } = storeToRefs(customerStore)

</script>

<template>
  <n-card>
    <div class="bookmark-panel">
      <bookmark-item
        class="item"
        v-for="(item, index) in getCurrentBookmark"
        v-bind="item"
        :index="`${item.beverage} + ${index}`"
      />
    </div>
  </n-card>
</template>

<style scoped lang="scss">
.bookmark-panel {
  display: grid;
  row-gap: 12px;
}
</style>