<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, watch } from 'vue'

import { useCustomerRareStore } from '@/pinia'

import { difference } from 'lodash'

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

watch(enabledPlaceList, (cur, pre) => {
  const isClear = cur.length === 0
  if (isClear) {
    enabledCustomer.value = []
    return
  }
  const isReduce = cur.length < pre.length
  if (isReduce) {
    const reducePlace = difference(pre, cur)
    const reduceCustomer = customer.filter(({ place }) => reducePlace.includes(place)).map(v => v.name)
    enabledCustomer.value = enabledCustomer.value.filter((name) => !reduceCustomer.includes(name))
  }
})
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
        <n-transfer
          ref="transfer"
          v-model:value="enabledCustomer"
          :options="selectCustomerOptions"
          source-filterable
          target-filterable
        />
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
}
.btn-item {
  flex: 1;
}
</style>