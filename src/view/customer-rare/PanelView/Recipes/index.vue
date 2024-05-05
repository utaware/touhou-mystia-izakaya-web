<script setup lang="ts">
import { ref, computed } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore, useIngredientsStore } from '@/pinia'
import type { TRecipeMatchItem } from '@/pinia'

import filterModal from './filter.vue'

import { createColumns, getRowKey, pagination } from './table/index.tsx'

import { orderBy } from 'lodash'

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
const tableOrder = ref<'desc' | 'asc'>('desc')

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

const tableData = computed(() => {
  return orderBy(recipes.value, ['match_recipe_point'], [tableOrder.value])
})

const handleFilterTableData = (state: {}) => {
  console.log(state)
}
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
        <n-button text>匹配度({{ tableOrder }})</n-button>
        <n-switch
          :round="false"
          checked-value="desc"
          unchecked-value="asc"
          v-model:value="tableOrder"
        />
      </n-space>
    </div>
    <!-- view -->
    <n-data-table
      class="view"
      striped
      :row-key="getRowKey"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :row-props="rowProps"
    />
    <!-- modal -->
    <filter-modal
      v-model:show="filterModalShow"
      @filter="handleFilterTableData"
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
  ::v-deep {
    td.sort-columns {
      background-color: #fff;
    }
  }
}
</style>