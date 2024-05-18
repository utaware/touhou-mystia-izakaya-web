<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { Settings32Filled } from '@vicons/fluent'

import type { TCustomerRare } from '@/material'
import { useCustomerRareStore } from '@/pinia'

import FilterModal from './FilterModal/index.vue'

import { getCustomerRareSrc } from '@/utils/pub-use'

const customerRareStore = useCustomerRareStore()

const { filterCustomerWithName, currentCustomerName } = storeToRefs(customerRareStore)

const { setCurrentCustomer, resetSelectMenu } = customerRareStore

const modalFilterShow = ref(false)
const isCheckedReset = ref(false)

const openFilterModal = () => {
  modalFilterShow.value = true
}

const handlerClickCustomer = (item: TCustomerRare) => {
  if (isCheckedReset.value) {
    resetSelectMenu()
  }
  setCurrentCustomer(item)
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- button -->
    <n-space justify="space-between" align="center">
      <!-- 设置 -->
      <n-button class="config" @click="openFilterModal">
        <n-space align="center">
          <n-icon :component="Settings32Filled"/>设置
        </n-space>
      </n-button>
      <!-- 重置选项 -->
      <n-checkbox v-model:checked="isCheckedReset">
        <n-button text title="选择角色后当前菜谱、酒水、食材、需求将会被重置">重置</n-button>
      </n-checkbox>
    </n-space>
    <!-- view -->
    <div class="customer-view">
      <!-- avatar -->
      <span
        v-for="(item, index) in filterCustomerWithName"
        :key="index"
        class="item"
        :class="{ active: item.name === currentCustomerName }"
        @click="handlerClickCustomer(item)"
      >
        <n-avatar
          class="avatar"
          :size="88"
          :src="getCustomerRareSrc(item)"
          :alt="item.name"
          :title="item.name"
        />
      </span>
    </div>
    <!-- modal -->
    <filter-modal v-model:show="modalFilterShow" />
  </div>
</template>

<style scoped lang="scss">
.config {
  margin-bottom: 12px;
}
.customer-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-around;
  gap: 8px;
  .item {
    display: inline-block;
    padding: 6px;
    width: 100px;
    height: 100px;
    background-size: 100%;
    background-color: #2e1b0d;
    border-radius: 4px;
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
    }
    &.active {
      background-color: #409eff;
    }
  }
}
</style>