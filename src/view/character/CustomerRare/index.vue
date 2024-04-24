<script setup lang="ts">
import { customerRare, type TCustomerRare } from '@/material'

import { SettingOutlined } from '@vicons/antd'

import { reactive } from 'vue'

import CustomerRareModal from './modal.vue'

const state = reactive({
  customerModalShow: false,
  isFastEditMode: false,
  currentCustomer: customerRare[0],
  customerRare
})

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
</script>

<template>
  <!-- control -->
  <div class="control">
    <!-- button -->
    <n-button class="config">
      <n-space>
        <n-icon :component="SettingOutlined"/>设置
      </n-space>
    </n-button>
    <!-- radio -->
    <n-space>
      <n-switch :on-update:value="handlerSwitchChange"/>快速编辑
    </n-space>
  </div>
  <!-- avatar -->
  <div class="avatar-panel">
    <span
      v-for="(item, index) in state.customerRare"
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
  <!-- modal -->
  <CustomerRareModal
    :show="state.customerModalShow"
    :customer="state.currentCustomer"
    :handleModalVisible="handleModalVisible"
  />
</template>

<style scoped lang="scss">
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
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