<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useCustomerRareStore, TCustomerRare } from '@/pinia'

import FilterCustomerModal from '../FilterCustomerModal/index.vue'

defineProps<{
  customer: TCustomerRare
}>()

const emit = defineEmits<{
  'update:customer': [value: TCustomerRare]
}>()

const customerRareStore = useCustomerRareStore()

const { filterCustomerWithName } = storeToRefs(customerRareStore)

const modalFilterShow = ref(false)

const toggleFilterModalShow = (value: boolean) => {
  modalFilterShow.value = value
}

const openFilterModal = () => toggleFilterModalShow(true)

const handlerClickCustomer = function (item: TCustomerRare) {
  emit('update:customer', item)
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- button -->
    <n-button class="config" @click="openFilterModal">
      <n-space>
        <n-icon :component="SettingOutlined"/>设置
      </n-space>
    </n-button>
    <!-- view -->
    <div class="customer-view">
      <!-- avatar -->
      <span
        v-for="(item, index) in filterCustomerWithName"
        :key="index"
        class="item"
        :class="{ disabled: item.disabled }"
        @click="handlerClickCustomer(item)"
      >
        <n-avatar
          class="avatar"
          :size="84"
          :src="item.src"
          :alt="item.name"
          :title="item.name"
        />
      </span>
    </div>
    <!-- modal -->
    <filter-customer-modal v-model:show="modalFilterShow" />
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