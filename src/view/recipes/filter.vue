<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

import {
  dlcOptions,
  recipesToolOptions,
  recipesLevelOptions,
  positiveTagOptions,
  negativeTagOptions,
  ingredientsOptions,
} from '@/material/options'

import type { TRecipeItem } from '@/material'

import { renderSelectTags } from '@/render/SelectTags'
import { renderSelectToolsLabel } from '@/render/SelectToolsLabel'
import { filterRecipesWithForm } from '@/utils/recipes/filter'

const props = defineProps<{
  value: TRecipeItem[]
}>()

const emit = defineEmits<{
  'update:value': [value: TRecipeItem[]]
}>()

const defaultRecipes = props.value

const filterForm = reactive({
  dlc: [],
  name: '',
  positiveTags: [],
  noPositiveTags: [],
  negativeTags: [],
  noNegativeTags: [],
  tools: [],
  levels: [],
  ingredients: [],
  noIngredients: [],
})

watchEffect(() => {
  const filterRecipes = filterRecipesWithForm(defaultRecipes, filterForm)
  emit('update:value', filterRecipes)
})
</script>

<template>
  <!-- content -->
  <n-drawer-content
    title="料理筛选"
    :bordered="false"
    :segmented="false"
    closable
    size="huge"
  >
    <n-form :label-width="80">
      <!-- dlc -->
      <n-form-item label="DLC : ">
        <n-checkbox-group class="checkbox-container" v-model:value="filterForm.dlc">
          <n-checkbox v-for="({ label, value }) in dlcOptions" :value="value" :label="label" />
        </n-checkbox-group>
      </n-form-item>
      <!-- 正特性 -->
      <n-form-item label="正特性(包含) : ">
        <n-select
          v-model:value="filterForm.positiveTags"
          multiple
          :options="positiveTagOptions"
          :render-tag="renderSelectTags({ category: 'like' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <!-- 正特性 -->
      <n-form-item label="正特性(不包含) : ">
        <n-select
          v-model:value="filterForm.noPositiveTags"
          multiple
          :options="positiveTagOptions"
          :render-tag="renderSelectTags({ category: 'like' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <!-- 反特性 -->
      <n-form-item label="反特性(包含) : ">
        <n-select
          v-model:value="filterForm.negativeTags"
          multiple
          :options="negativeTagOptions"
          :render-tag="renderSelectTags({ category: 'hate' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item label="反特性(不包含) : ">
        <n-select
          v-model:value="filterForm.noNegativeTags"
          multiple
          :options="negativeTagOptions"
          :render-tag="renderSelectTags({ category: 'hate' })"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <!-- 厨具 -->
      <n-form-item label="厨具 : ">
        <n-select
          v-model:value="filterForm.tools"
          multiple
          :options="recipesToolOptions"
          :render-label="renderSelectToolsLabel"
          :max-tag-count="1"
          clearable
        />
      </n-form-item>
      <!-- 等级 -->
      <n-form-item label="等级 : ">
        <n-select
          v-model:value="filterForm.levels"
          multiple
          :options="recipesLevelOptions"
          max-tag-count="responsive"
          clearable
        />
      </n-form-item>
      <!-- 食材 -->
      <n-form-item label="食材(包含) : ">
        <n-select
          v-model:value="filterForm.ingredients"
          multiple
          :options="ingredientsOptions"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item label="食材(不包含) : ">
        <n-select
          v-model:value="filterForm.noIngredients"
          multiple
          :options="ingredientsOptions"
          max-tag-count="responsive"
          clearable
          filterable
        />
      </n-form-item>
      <!-- search -->
      <n-form-item label="名称 : ">
        <n-input v-model:value="filterForm.name" clearable />
      </n-form-item>
    </n-form>
  </n-drawer-content>
</template>

<style scoped lang="scss">
.checkbox-container {
  display: grid;
  width: 100%;
  row-gap: 6px;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
}
</style>