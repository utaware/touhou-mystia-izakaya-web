<script setup lang="ts">
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore } from '@/pinia'
import type { TRecipeMatchItem } from '@/pinia'

import filterModal from './filter.vue'

import { createColumns, getRowKey, pagination } from './render/table.tsx'

const recipesStore = useRecipesStore()

const {
  getFilterRecipes: recipes,
  sortOrder,
} = storeToRefs(recipesStore)

const {
  setCurrentRecipe,
  setSortOrder,
} = recipesStore

const columns = createColumns({})

const filterModalShow = ref(false)

const openFilterModal = () => {
  filterModalShow.value = true
}

const rowProps = (item: TRecipeMatchItem) => {
  return {
    onClick: () => setCurrentRecipe(item)
  }
}

const tableEl = ref()

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
      <n-button class="config" @click="openFilterModal">
        <n-space>
          <n-icon :component="SettingOutlined"/>设置
        </n-space>
      </n-button>
      <!-- 排序 -->
      <n-space>
        <n-button text>匹配度({{ sortOrder }})</n-button>
        <n-switch
          :round="false"
          checked-value="desc"
          unchecked-value="asc"
          :value="sortOrder"
          :on-update:value="setSortOrder"
        />
      </n-space>
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
      :row-props="rowProps"
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