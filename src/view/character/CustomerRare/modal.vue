<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { type TCustomerRare } from '@/material'

interface PropsType {
  show: boolean;
  customer: TCustomerRare;
  handleModalVisible: (value: boolean) => void
}

const props = defineProps<PropsType>()

const customer = computed(() => props.customer)
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
      <div class="wrapper">
        <n-avatar
          class="avatar"
          :size="84"
          :src="customer.src"
          :alt="customer.name"
          round
        />
      </div>
      <!-- avatar -->
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">

</style>