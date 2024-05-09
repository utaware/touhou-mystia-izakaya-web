<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useBeveragesStore } from '@/pinia'

import ConfigView from './config.vue'

import { createColumns, pagination, getRowKey } from './render/table'
import { renderExpandIcon } from '@/render/ExpandIcon'


const beveragesStore = useBeveragesStore()

const { getBeverageWithCurrentCustomer: beverages } = storeToRefs(beveragesStore)

const { setCurrentBeverage } = beveragesStore

const columns = createColumns({
  handleSelectRow: setCurrentBeverage
})
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <config-view />
    <!-- view -->
    <n-data-table
      class="beverages-view"
      striped
      ref="tableEl"
      :row-key="getRowKey"
      :columns="columns"
      :data="beverages"
      :pagination="pagination"
      :render-expand-icon="renderExpandIcon"
      pagination-behavior-on-filter="first"
    />
  </div>
</template>

<style scoped lang="scss">
.beverages-view {
  margin-top: 12px;
}
</style>