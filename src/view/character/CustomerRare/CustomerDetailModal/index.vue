<script setup lang="ts">
import { defineProps } from 'vue'
import { type TCustomerRare } from '@/material'

import CommonTags from '@/components/common/tags/index.vue'

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
      class="card-wrapper"
      style="width: 600px"
      :bordered="false"
      :segmented="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="container">
        <!-- left -->
        <n-space class="left" justify="center" align="center" vertical>
          <!-- avatar -->
          <n-avatar
            class="avatar"
            :size="84"
            :src="customer.src"
            :alt="customer.name"
            round
          />
          <!-- name -->
          <div class="name">{{ customer.name }}</div>
          <!-- dlc -->
          <div class="dlc">{{ customer.dlc }}</div>
          <!-- 所属 -->
          <div class="place">{{ customer.place }}</div>
          <!-- 持有金 -->
          <div class="price">{{ customer.price }}(円)</div>
        </n-space>
        <!-- right -->
        <n-space class="right" vertical>
          <!-- 料理喜好 -->
          <!-- <common-tags :value="customer.like_tags" category="like" /> -->
          <!-- 料理讨厌 -->
          <!-- <common-tags :value="customer.hate_tags" category="hate" /> -->
          <!-- 酒水喜好 -->
          <!-- <common-tags :value="customer.beverage_tags" category="beverage" /> -->
        </n-space>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.card-wrapper {
  background-color: var(--color-common-brown);
}
.container {
  display: grid;
  column-gap: 28px;
  grid-template-columns: 120px auto;
  grid-template-areas: 'a c';
  .left {
    font-weight: bold;
  }
}
</style>