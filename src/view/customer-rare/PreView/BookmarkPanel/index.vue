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
        v-for="(item) in getCurrentBookmark"
        v-bind="item"
        :key="item.uuid"
        :size="48"
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