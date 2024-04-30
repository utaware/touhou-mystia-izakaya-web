<script setup lang="ts">
import { ref, computed } from 'vue'

import { CloseCircleFilled } from '@vicons/antd'

import { useCustomerRareStore, TCustomerRare } from '@/pinia'

import TransferPicker from './transfer.vue'

defineProps<{ show: boolean }>()

const emit = defineEmits<{
  'update:show': [value: boolean],
}>()

const customerRareStore = useCustomerRareStore()

const { place, customer, activeCustomerNames, acvitePlace, setActiveCustomer } = customerRareStore

const enabledPlaceList = ref<string[]>([...acvitePlace])

const enabledCustomer = ref<string[]>([...activeCustomerNames])

const selectCustomerOptions = computed(() => {
  return customer
    .filter(({ place }) => enabledPlaceList.value.includes(place))
    .map(({ name }) => ({ label: name, value: name }))
})

const selectCustomerList = computed(() => {
  return customer
    .filter(({ name }) => enabledCustomer.value.includes(name))
})

const selectPlaceOptions = place.map((v) => {
  return { label: v, value: v }
})

const handleModalEnter = () => {
  setActiveCustomer(enabledCustomer.value)
  emit('update:show', false)
}

const handleModalClose = () => {
  emit('update:show', false)
}

const handleRemoveItem = (item: TCustomerRare) => {
  const { name } = item
  const index = enabledCustomer.value.indexOf(name)
  enabledCustomer.value.splice(index, 1)
}
</script>

<template>
  <!-- modal -->
  <n-modal
    display-directive="show"
    transform-origin="center"
    :mask-closable="false"
    :show="show"
  >
    <!-- card -->
    <n-card
      style="width: 600px"
      :bordered="false"
    >
      <!-- wrapper -->
      <div class="wrapper">
        <!-- place -->
        <n-select
          v-model:value="enabledPlaceList"
          placeholder="所属地区"
          multiple
          filterable
          clearable
          :options="selectPlaceOptions"
          :max-tag-count="3"
        />
        <!-- transfer -->
        <transfer-picker
          v-model:value="enabledCustomer"
          :options="selectCustomerOptions"
        >
          <!-- content -->
          <ul class="transfer-content">
            <!-- item -->
            <li
              class="item"
              v-for="(item, index) in selectCustomerList"
              :key="index">
              <!-- avatar -->
              <n-avatar
                :src="item.src"
                :title="item.name"
                :size="64"
                round
              />
              <!-- handle -->
              <div @click="handleRemoveItem(item)" class="modal">
                <n-icon size="24" color="white">
                  <CloseCircleFilled />
                </n-icon>
              </div>
            </li>
          </ul>
        </transfer-picker>
        <!-- button -->
        <n-space justify="space-between" :wrap-item="false">
          <n-button class="btn-item" @click="handleModalClose">取消</n-button>
          <n-button class="btn-item" @click="handleModalEnter">确认</n-button>
        </n-space>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  row-gap: 20px;
  .transfer-content {
    display: grid;
    row-gap: 8px;
    grid-template-columns: repeat(auto-fill, 64px);
    justify-content: space-between;
    .item {
      position: relative;
      font-size: 0;
      .modal {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
      &:hover {
        .modal {
          display: flex;
        }
      }
    }
  }
  .btn-item {
    flex: 1;
  }
}
</style>