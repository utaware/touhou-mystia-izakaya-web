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
      class="card-wrapper"
      style="width: 600px"
      :bordered="false"
      :segmented="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="container">
        <span class="unknow"></span>

        <!-- right -->
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  column-gap: 28px;
  grid-template-columns: 120px auto;
  grid-template-areas: 'a c';
  .unknow {
    display: inline-block;
    width: 64px;
    height: 64px;
    background: url('@/assets/unknown.jpg') no-repeat;
    background-size: cover;
  }
}
</style>