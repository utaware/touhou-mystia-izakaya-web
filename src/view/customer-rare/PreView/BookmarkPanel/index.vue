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
        :vertical="true"
        :key="item.uuid"
        :size="36"
      />
    </div>
  </n-card>
</template>

<style scoped lang="scss">
.bookmark-panel {
  display: flex;
  row-gap: 12px;
}
</style>