<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

import PreView from './PreView/index.vue'

import CustomerView from './PanelView/Customer/index.vue'
import RecipesView from './PanelView/Recipes/index.vue'
import BeveragesView from './PanelView/Beverages/index.vue'
import IngredientsView from './PanelView/Ingredients/index.vue'

const customerStore = useCustomerRareStore()

const { activeTabName } = storeToRefs(customerStore)

const tabPanes = [
  { name: 'customer', tab: '顾客', component: CustomerView },
  { name: 'recipes', tab: '料理', component: RecipesView },
  { name: 'beverages', tab: '酒水', component: BeveragesView },
  { name: 'ingredients', tab: '食材', component: IngredientsView },
]
</script>

<template>
  <!-- content -->
  <div class="content">
    <!-- left: 可选视图切换 -->
    <n-card content-style="padding: 0;">
      <!-- views -->
      <n-tabs
        v-model:value="activeTabName"
        type="segment"
        animated
        pane-style="padding: 12px;"
      >
        <n-tab-pane
          v-for="(item) in tabPanes"
          :key="item.name"
          display-directive="show:lazy"
          :name="item.name"
          :tab="item.tab"
        >
          <component :is="item.component" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <!-- right: 信息整合 -->
    <pre-view />
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 12px;
  display: grid;
  column-gap: 12px;
  min-height: calc(100vh - 78px);
  grid-template-columns: repeat(2, 1fr);
}
</style>