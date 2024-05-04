<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore, useIngredientsStore, type TRecipeItem } from '@/pinia'

import detailModal from './detail.vue'
import filterModal from './filter.vue'

import { createColumns, getRowKey, pagination } from './table/index.tsx'

const recipesStore = useRecipesStore()
const ingredientsStore = useIngredientsStore()

const { getIngredientIndex } = ingredientsStore

const {
  getRecipesWithCustomerRare: recipes,
}: {
  getRecipesWithCustomerRare: TRecipeItem[]
} = storeToRefs(recipesStore)

const { getToolIndex } = recipesStore

const columns = createColumns({
  getIngredientIndex,
  getToolIndex,
})

const detailModalShow = ref(false)
const filterModalShow = ref(false)

const handleClickItem = (item: TRecipeItem) => {
  recipesStore.setCurrentRecipe(item)
  detailModalShow.value = true
}

const openFilterModal = () => {
  filterModalShow.value = true
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
      :row-key="getRowKey"
      :columns="columns"
      :data="recipes"
      :pagination="pagination"
    />
    <!-- modal -->
    <detail-modal v-model:show="detailModalShow" />
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
}
</style>