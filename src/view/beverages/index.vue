<script setup lang="ts">
import { ref } from 'vue'

import { createDiscreteApi } from 'naive-ui'

import { beverages } from '@/material'
import type { TBeverageItem } from '@/material'

import { createNotification } from '@/render/Notification/Beverages'

import { CalendarWeekStart20Regular } from '@vicons/fluent'

import FilterModal from './filter.vue'

const filterVisible = ref(false)

const allBeverageIndex = beverages.map(({ index }) => index)

const filterBeverages = ref(allBeverageIndex)

const { notification } = createDiscreteApi(['notification'])

const handleToggleVisible = () => {
  filterVisible.value = !filterVisible.value
}

const handleItemClick = (item: TBeverageItem) => {
  const options = createNotification(item)
  notification.create(options)
}
</script>

<template>
  <!-- page -->
  <div class="beverages-page pd12">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="material-list">
        <li
          class="item"
          v-for="(item, index) in beverages"
          v-show="filterBeverages.includes(item.index)"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <n-badge type="success" :value="item.price">
            <img
              width="64"
              :src="`/public/beverages/${item.name}.png`"
              :alt="item.name"
              :title="item.name"
            >
          </n-badge>
          <!-- text -->
          <span class="label">{{ item.name }}</span>
        </li>
      </ul>
      <!-- button -->
      <div class="fixed" @click="handleToggleVisible">
        <n-icon size="26" :component="CalendarWeekStart20Regular" />
      </div>
      <!-- filter -->
      <n-drawer
        v-model:show="filterVisible"
        :width="320"
        placement="left"
        mask-closable
        display-directive="show"
      >
        <filter-modal v-model:value="filterBeverages" />
      </n-drawer>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/material.scss');
</style>