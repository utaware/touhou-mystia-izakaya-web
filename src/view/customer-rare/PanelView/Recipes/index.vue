<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore, useIngredientsStore } from '@/pinia'
import type { TRecipeMatchItem } from '@/pinia'

import filterModal from './filter.vue'

import { createColumns, getRowKey, pagination } from './table/index.tsx'

const recipesStore = useRecipesStore()
const ingredientsStore = useIngredientsStore()

const { getIngredientIndex } = ingredientsStore

const {
  getRecipesWithCustomerRare: recipes,
} = storeToRefs(recipesStore)

const {
  getToolIndex,
  setCurrentRecipe,
} = recipesStore

const columns = createColumns({
  getIngredientIndex,
  getToolIndex,
})

const filterModalShow = ref(false)

const handleClickItem = (item: TRecipeMatchItem) => {
  setCurrentRecipe(item)
}

const openFilterModal = () => {
  filterModalShow.value = true
}

const rowProps = (item: TRecipeMatchItem) => {
  return {
    onClick: () => handleClickItem(item)
  }
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <div class="config">
      <n-button class="config" @click="openFilterModal">
        <n-space>
          <n-icon :component="SettingOutlined"/>设置
        </n-space>
      </n-button>
    </div>
    <!-- view -->
    <n-data-table
      class="view"
      striped
      :row-key="getRowKey"
      :columns="columns"
      :data="recipes"
      :pagination="pagination"
      :row-props="rowProps"
    />
    <!-- modal -->
    <filter-modal v-model:show="filterModalShow"/>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .config {
    display: flex;
    justify-content: space-between;
  }
  .view {
    margin-top: 12px;
  }
  ::v-deep {
    td.sort-columns {
      background-color: #fff;
    }
  }
}
</style>