<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useBeveragesStore, useRecipesStore, useCustomerRareStore } from '@/pinia'

import { useDemandSelect } from '@/hooks/demand'

const { handleChangePositiveTag } = useDemandSelect()

const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()
const customerStore = useCustomerRareStore()

const { positiveTagOptions } = recipesStore
const { beverageTagOptions } = beveragesStore

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
      clearable
    />
    <!-- 酒水需求 -->
    <n-select
      class="right"
      v-model:value="demandBeverageTag"
      :options="beverageTagOptions"
      placeholder="酒水需求"
      filterable
      clearable
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