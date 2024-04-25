<script setup lang="ts">
import { defineProps } from 'vue'
import { type TCustomerRare } from '@/material'

interface PropsType {
  show: boolean;
  customer: TCustomerRare;
  handleModalVisible: (value: boolean) => void
}

defineProps<PropsType>()
</script>

<template>
  <!-- modal -->
  <n-modal :show="show" :on-update:show="handleModalVisible">
    <!-- card -->
    <n-card
      style="width: 600px"
      :title="customer.name"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="container">
        <!-- left -->
        <n-space class="left" justify="center">
          <!-- avatar -->
          <n-avatar
            class="avatar"
            :size="84"
            :src="customer.src"
            :alt="customer.name"
            round
          />
          <!-- dlc -->
          <div class="dlc">{{ customer.dlc }}</div>
          <!-- 所属 -->
          <div class="place">{{ customer.place }}</div>
          <!-- 持有金 -->
          <div class="price">{{ customer.price }}(円)</div>
        </n-space>
        <!-- right -->
        <div class="right">
          <!-- 料理喜好 -->
          <!-- 料理讨厌 -->
          <!-- 酒水喜好 -->
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  .left {
    flex: 0;
  }
  .right {
    flex: 1;
  }
}
</style>