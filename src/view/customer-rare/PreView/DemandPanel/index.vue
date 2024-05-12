<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

import { useDemandSelect } from '@/hooks/demand'

import { beverageTagOptions, positiveTagOptions } from '@/material/options'

const { handleChangePositiveTag, handleChangeBeverageTag } = useDemandSelect()

const customerStore = useCustomerRareStore()

const { demandRecipeTag, demandBeverageTag } = storeToRefs(customerStore)

const recipeTagOptions = positiveTagOptions.concat({ label: '夜雀厨具', value: '夜雀厨具', class: 'bold' })
</script>

<template>
  <div class="demand-panel">
    <!-- 菜谱需求 -->
    <n-form-item class="left" label="料理需求 : " label-placement="left" :show-feedback="false">
      <n-select
        :value="demandRecipeTag"
        :on-update:value="handleChangePositiveTag"
        :options="recipeTagOptions"
        clearable
        placeholder="料理需求"
        filterable
      />
    </n-form-item>
    <!-- 酒水需求 -->
    <n-form-item class="right" label="酒水需求 : " label-placement="left" :show-feedback="false">
      <n-select
        :value="demandBeverageTag"
        :on-update:value="handleChangeBeverageTag"
        :options="beverageTagOptions"
        clearable
        placeholder="酒水需求"
        filterable
      />
    </n-form-item>
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