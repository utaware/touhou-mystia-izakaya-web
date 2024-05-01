<script setup lang="ts">
import { customerRare, type TCustomerRare } from '@/material'

import { SettingOutlined } from '@vicons/antd'

import { reactive } from 'vue'

import { useCustomerRareStore } from '@/pinia'

import { storeToRefs } from 'pinia'

import CustomerDetailModal from './CustomerDetailModal/index.vue'
import FilterCustomerModal from './FilterCustomerModal/index.vue'
import SelectCustomerPanel from './SelectCustomerPanel/index.vue'

const state = reactive({
  customerModalShow: false,
  modalFilterShow: false,
  isFastEditMode: false,
  currentCustomer: customerRare[0],
  customerRare
})

const customerRareStore = useCustomerRareStore()

const { filterCustomerWithName } = storeToRefs(customerRareStore)

const handlerClickAvatar = function (item: TCustomerRare) {
  if (state.isFastEditMode) {
    item.disabled = !item.disabled
  } else {
    state.currentCustomer = item
    state.customerModalShow = true
  }
}

const handlerSwitchChange = function (value: boolean) {
  state.isFastEditMode = value
}

const handleModalVisible = (value: boolean) => {
  state.customerModalShow = value
}

const toggleFilterModalShow = (value: boolean) => {
  state.modalFilterShow = value
}

const openFilterModal = () => toggleFilterModalShow(true)
</script>

<template>
  <!-- control -->
  <div class="control">
    <!-- button -->
    <n-button class="config" @click="openFilterModal">
      <n-space>
        <n-icon :component="SettingOutlined"/>设置
      </n-space>
    </n-button>
    <!-- radio -->
    <n-space>
      <n-switch :on-update:value="handlerSwitchChange"/>快速编辑
    </n-space>
  </div>
  <div class="content">
    <!-- avatar -->
    <div class="avatar-panel">
      <span
        v-for="(item, index) in filterCustomerWithName"
        :key="index"
        class="item"
        :class="{ disabled: item.disabled }"
        @click="handlerClickAvatar(item)"
      >
        <n-avatar
          class="avatar"
          :size="84"
          :src="item.src"
          :alt="item.name"
        />
      </span>
    </div>
    <!-- config -->
    <select-customer-panel
      :customer="state.currentCustomer"
    />
  </div>
  <!-- modal -->
  <customer-detail-modal
    :show="state.customerModalShow"
    :customer="state.currentCustomer"
    :handleModalVisible="handleModalVisible"
  />
  <filter-customer-modal
    v-model:show="state.modalFilterShow"
  />
</template>

<style scoped lang="scss">
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  display: grid;
  column-gap: 24px;
  grid-template-columns: 1fr 1fr;
}
.avatar-panel {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-around;
  gap: 8px;
  .item {
    display: inline-block;
    padding: 8px;
    width: 100px;
    height: 100px;
    background: url('@/assets/bg.png') no-repeat;
    background-size: 100%;
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
    }
  }
}
</style>