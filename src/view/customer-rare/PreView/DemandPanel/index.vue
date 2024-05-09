<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, useCustomerRareStore } from '@/pinia'

import { useDemandSelect } from '@/hooks/demand'

import { beverageTagOptions } from '@/material/options'

const { handleChangePositiveTag } = useDemandSelect()

const recipesStore = useRecipesStore()
const customerStore = useCustomerRareStore()

const { positiveTagOptions } = recipesStore

const { demandRecipeTag, demandBeverageTag } = storeToRefs(customerStore)
</script>

<template>
  <div class="demand-panel">
    <!-- 菜谱需求 -->
    <n-select
      class="left"
      :value="demandRecipeTag"
      :on-update:value="handleChangePositiveTag"
      :options="positiveTagOptions"
      placeholder="菜谱需求"
      filterable
    />
    <!-- 酒水需求 -->
    <n-select
      class="right"
      v-model:value="demandBeverageTag"
      :options="beverageTagOptions"
      placeholder="酒水需求"
      filterable
    />
  </div>
</template>

<style scoped lang="scss">
.demand-panel {
  display: grid;
  grid-template-areas: 'left empty right';
  grid-template-columns: repeat(3, 1fr);
  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
}
</style>