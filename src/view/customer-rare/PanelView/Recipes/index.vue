<script setup lang="ts">
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore } from '@/pinia'

import filterModal from './filter.vue'

import { renderExpandIcon } from '@/render/ExpandIcon.tsx'

import { createColumns, getRowKey, pagination } from './render/table.tsx'

const recipesStore = useRecipesStore()

const { getRecipesTableData: recipes } = storeToRefs(recipesStore)

const { setCurrentRecipe } = recipesStore

const filterModalShow = ref(false)

const openFilterModal = () => {
  filterModalShow.value = true
}

const tableEl = ref()

const columns = createColumns({ handleSelectRow: setCurrentRecipe })

// 排序&筛选后回到第1页
watch(recipes, () => {
  tableEl.value.page(1)
})
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <div class="config">
      <!-- 设置 -->
      <n-button @click="openFilterModal">
        <n-space>
          <n-icon :component="SettingOutlined"/>设置
        </n-space>
      </n-button>
    </div>
    <!-- view -->
    <n-data-table
      class="view"
      striped
      ref="tableEl"
      :row-key="getRowKey"
      :columns="columns"
      :data="recipes"
      :pagination="pagination"
      :render-expand-icon="renderExpandIcon"
    />
    <!-- modal -->
    <filter-modal
      v-model:show="filterModalShow"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .config {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .view {
    margin-top: 12px;
  }
}
</style>