<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

import BookmarkItem from './item.vue'

const customerStore = useCustomerRareStore()

const { getCurrentBookmark } = storeToRefs(customerStore)

</script>

<template>
  <n-card content-style="padding: 12px;">
    <n-scrollbar style="width: calc(50vw - 60px)" x-scrollable>
      <div class="bookmark-panel">
        <bookmark-item
          class="item"
          v-for="(item) in getCurrentBookmark"
          v-bind="item"
          :vertical="true"
          :key="item.uuid"
          :size="36"
        />
      </div>
    </n-scrollbar>
  </n-card>
</template>

<style scoped lang="scss">
.bookmark-panel {
  display: flex;
  flex-wrap: nowrap;
  .item + .item {
    margin-left: 12px;
  }
}
</style>