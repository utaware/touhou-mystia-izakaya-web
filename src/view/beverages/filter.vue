<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

import { useBeveragesStore } from '@/pinia'

import {
  dlcOptions,
  beverageLevelOptions,
  beverageTagOptions,
} from '@/material/options'

import { renderSelectTags } from '@/render/SelectTags'
import { filterBeveragesWithForm } from '@/utils/beverages/filter'

const beveragesStore = useBeveragesStore()

const { beverages } = beveragesStore

const emit = defineEmits<{
  'update:value': [value: number[]]
}>()

const filterForm = reactive({
  dlc: [],
  name: '',
  beverageTags: [],
  noBeverageTags: [],
  levels: [],
})

watchEffect(() => {
  const filterBeverages = filterBeveragesWithForm(beverages, filterForm)
  const visibleIndex = filterBeverages.map(({ index }) => index)
  emit('update:value', visibleIndex)
})
</script>

<template>
  <!-- content -->
  <n-drawer-content
    title="料理筛选"
    :bordered="false"
    :segmented="false"
    closable
    size="huge"
  >
    <n-form :label-width="80">
      <!-- dlc -->
      <n-form-item label="DLC : ">
        <n-checkbox-group class="checkbox-container" v-model:value="filterForm.dlc">
          <n-checkbox v-for="({ label, value }) in dlcOptions" :value="value" :label="label" />
        </n-checkbox-group>
      </n-form-item>
      <!-- 正特性 -->
      <n-form-item label="酒水标签(包含) : ">
        <n-select
          v-model:value="filterForm.beverageTags"
          multiple
          :options="beverageTagOptions"
          :render-tag="renderSelectTags({ category: 'beverage' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item label="酒水标签(不包含) : ">
        <n-select
          v-model:value="filterForm.noBeverageTags"
          multiple
          :options="beverageTagOptions"
          :render-tag="renderSelectTags({ category: 'beverage' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <!-- 等级 -->
      <n-form-item label="等级 : ">
        <n-select
          v-model:value="filterForm.levels"
          multiple
          :options="beverageLevelOptions"
          max-tag-count="responsive"
          clearable
        />
      </n-form-item>
      <!-- search -->
      <n-form-item label="名称 : ">
        <n-input v-model:value="filterForm.name" clearable />
      </n-form-item>
    </n-form>
  </n-drawer-content>
</template>

<style scoped lang="scss">
.checkbox-container {
  display: grid;
  width: 100%;
  row-gap: 6px;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
}
</style>