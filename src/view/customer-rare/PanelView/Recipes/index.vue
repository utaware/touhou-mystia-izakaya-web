<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { SettingOutlined } from '@vicons/antd'

import { useRecipesStore, type TRecipeItem } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

import detailModal from './detail.vue'
import filterModal from './filter.vue'

import { columns } from './table'

const recipesStore = useRecipesStore()

const {
  getRecipesWithCustomerRare: recipes,
} = storeToRefs(recipesStore)

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
      :columns="columns"
      :data="recipes"
      row-key="name"
    />
    <ul class="recipes-view">
      <li
        class="item"
        v-for="(item, index) in recipes"
        :key="index"
      >
        <n-badge
          :value="item.badge_text"
          show-zero
          type="error"
          @click="handleClickItem(item)"
        >
          <sprite-item
            :index="item.index"
            :width="48"
            :height="48"
            :title="item.name"
            type="recipes"
          />
        </n-badge>
      </li>
    </ul>
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
  .recipes-view {
    margin-top: 24px;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, 64px);
    justify-content: space-between;
  }
  .view {
    margin-top: 12px;
  }
}
</style>