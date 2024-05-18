<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

import { useDemandSelect } from '@/hooks/demand'

import { beverageTagOptions, positiveTagOptions } from '@/material/options'

const { handleChangePositiveTag, handleChangeBeverageTag } = useDemandSelect()

const customerStore = useCustomerRareStore()

const { demandRecipeTag, demandBeverageTag, demandSyncFilter } = storeToRefs(customerStore)

const recipeTagOptions = positiveTagOptions.concat({ label: '厨具『夜雀』', value: '厨具『夜雀』', class: 'bold' })
</script>

<template>
  <n-grid :x-gap="12" :cols="12">
    <!-- 同步 -->
    <n-gi :span="2">
      <n-form-item class="sync" label-placement="left" :show-feedback="false">
        <n-checkbox v-model:checked="demandSyncFilter">同步列表筛选</n-checkbox>
      </n-form-item>
    </n-gi>
    <!-- 菜谱需求 -->
    <n-gi :span="4" :offset="1">
      <n-form-item class="recipe" label="料理 : " label-placement="left" :show-feedback="false">
        <n-select
          :value="demandRecipeTag"
          :on-update:value="handleChangePositiveTag"
          :options="recipeTagOptions"
          clearable
          placeholder="料理需求"
          filterable
        />
      </n-form-item>
    </n-gi>
    <!-- 酒水需求 -->
    <n-gi :span="4" :offset="1">
      <n-form-item class="beverage" label="酒水 : " label-placement="left" :show-feedback="false">
        <n-select
          :value="demandBeverageTag"
          :on-update:value="handleChangeBeverageTag"
          :options="beverageTagOptions"
          clearable
          placeholder="酒水需求"
          filterable
        />
      </n-form-item>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="scss">

</style>