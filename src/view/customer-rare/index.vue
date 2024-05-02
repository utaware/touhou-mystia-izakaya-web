<script setup lang="ts">
import { customerRare, type TCustomerRare } from '@/material'

import { ref, reactive } from 'vue'

import SelectCustomerPanel from './SelectCustomerPanel/index.vue'

import CustomerView from './PanelView/customer.vue'
import RecipesView from './PanelView/recipes.vue'

const currentCustomer = ref<TCustomerRare>(customerRare[0])

const state = reactive({
  activeTabName: 'recipes',
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
          <customer-view v-model:customer="currentCustomer" />
        </n-tab-pane>
        <n-tab-pane name="recipes" tab="料理">
          <recipes-view />
        </n-tab-pane>
        <n-tab-pane name="beverages" tab="酒水">
          酒水
        </n-tab-pane>
        <n-tab-pane name="ingredients" tab="食材">
          食材
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <!-- right: 信息整合 -->
    <select-customer-panel :customer="currentCustomer" />
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