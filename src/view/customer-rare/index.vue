<script setup lang="ts">
import { customerRare } from '@/material'

import { reactive } from 'vue'

import SelectCustomerPanel from './SelectCustomerPanel/index.vue'

import CustomerView from './PanelView/customer.vue'
import RecipesView from './PanelView/recipes.vue'
import BeveragesView from './PanelView/beverages.vue'
import IngredientsView from './PanelView/ingredients.vue'

const state = reactive({
  activeTabName: 'recipes',
  currentCustomer: customerRare[0],
})
</script>

<template>
  <!-- content -->
  <div class="content">
    <!-- left: 可选视图切换 -->
    <n-card content-style="padding: 0;">
      <!-- views -->
      <n-tabs
        v-model:value="state.activeTabName"
        type="segment"
        animated
        pane-style="padding: 12px;"
      >
        <n-tab-pane name="customer" tab="顾客">
          <customer-view v-model:customer="state.currentCustomer" />
        </n-tab-pane>
        <n-tab-pane name="recipes" tab="料理">
          <recipes-view :customer="state.currentCustomer" />
        </n-tab-pane>
        <n-tab-pane name="beverages" tab="酒水">
          <beverages-view :customer="state.currentCustomer" />
        </n-tab-pane>
        <n-tab-pane name="ingredients" tab="食材">
          <ingredients-view :customer="state.currentCustomer" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <!-- right: 信息整合 -->
    <select-customer-panel :customer="state.currentCustomer" />
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