<script setup lang="ts">
import { ref } from 'vue'

import SelectCustomerPanel from './SelectCustomerPanel/index.vue'

import CustomerView from './PanelView/Customer/index.vue'
import RecipesView from './PanelView/Recipes/index.vue'
import BeveragesView from './PanelView/Beverages/index.vue'
import IngredientsView from './PanelView/Ingredients/index.vue'

const tabPanes = [
  { name: 'customer', tab: '顾客', component: CustomerView },
  { name: 'recipes', tab: '料理', component: RecipesView },
  { name: 'beverages', tab: '酒水', component: BeveragesView },
  { name: 'ingredients', tab: '食材', component: IngredientsView },
]

const activeTabName = ref<string>('beverages')
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
          display-directive="show"
          :name="item.name"
          :tab="item.tab"
        >
          <component :is="item.component" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <!-- right: 信息整合 -->
    <select-customer-panel />
  </div>
</template>

<style scoped lang="scss">
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  display: grid;
  column-gap: 12px;
  grid-template-columns: 1fr 1fr;
}
</style>