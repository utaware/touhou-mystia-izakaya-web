<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

import { useBeveragesStore } from '@/pinia'

import type { TBeverageItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from './render/notification.tsx'

const beveragesStore = useBeveragesStore()

const { beverages } = beveragesStore

const { notification } = createDiscreteApi(['notification'])

const handleItemClick = (item: TBeverageItem) => {
  const options = createNotification(item)
  notification.create(options)
}
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="material-list">
        <li
          class="item"
          v-for="(item, index) in beverages"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <SpriteItem :index="item.index" type="beverages" :size="64" :value="item.name" :title="item.name" />
          <!-- text -->
          <span class="label">{{ item.name }}</span>
        </li>
      </ul>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/material.scss');
</style>