<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useBeveragesStore } from '@/pinia'
import type { TBeverageMatchItem } from '@/pinia'

import { createColumns, pagination, getRowKey } from './render/table'

const columns = createColumns({})

const beveragesStore = useBeveragesStore()

const { getBeverageWithCurrentCustomer: beverages } = storeToRefs(beveragesStore)

const { setCurrentBeverage } = beveragesStore

const rowProps = (item: TBeverageMatchItem) => {
  return {
    onClick: () => setCurrentBeverage(item)
  }
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <div class="config">
      <!-- 标签选择 -->
      <!-- <n-select v-model:value="value" :options="options" /> -->
    </div>
    <!-- view -->
    <n-data-table
      class="beverages-view"
      striped
      ref="tableEl"
      :row-key="getRowKey"
      :columns="columns"
      :data="beverages"
      :pagination="pagination"
      :row-props="rowProps"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .beverages-view {
    margin-top: 12px;
  }
}
</style>