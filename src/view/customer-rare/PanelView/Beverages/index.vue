<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { useBeveragesStore } from '@/pinia'
import type { TBeverageMatchItem } from '@/pinia'

import { SettingOutlined } from '@vicons/antd'

import { createColumns, pagination, getRowKey } from './render/table'

const columns = createColumns({})

const beveragesStore = useBeveragesStore()

const { getBeverageWithCurrentCustomer: beverages } = storeToRefs(beveragesStore)

const { setCurrentBeverage } = beveragesStore

const filterModalShow = ref(false)

const openFilterModal = () => {
  filterModalShow.value = true
}

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
      <!-- 设置 -->
      <n-button class="config" @click="openFilterModal">
        <n-space>
          <n-icon :component="SettingOutlined"/>设置
        </n-space>
      </n-button>
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