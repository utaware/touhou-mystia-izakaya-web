<script setup lang="ts">
import { reactive, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { useRecipesStore } from '@/pinia'

import { renderToolsLabel, renderSelectTags } from './render/select'

const recipesStore = useRecipesStore()

const {
  negativeTagOptions,
  positiveTagOptions,
  allToolOptions,
  setFilterForm,
} = recipesStore

const {
  getMatchPointOptions
} = storeToRefs(recipesStore)

const model = reactive({
  selectedPositiveTags: [],
  selectedNegativeTags: [],
  selectedMatchPoints: [],
  selectedTools: [],
  searchName: ''
})

watch(
  model,
  (model) => setFilterForm(model),
  { deep: true }
)
</script>

<template>
  <!-- wrapper -->
  <n-drawer
    :width="320"
    :show-mask="false"
    display-directive="show"
  >
    <!-- card -->
    <n-drawer-content
      title="料理筛选"
      :bordered="false"
      :segmented="false"
      size="huge"
    >
      <!-- form -->
      <n-form
        class="filter-form"
        :label-width="80"
        :show-feedback="false"
      >
        <!-- 正特性 -->
        <n-form-item label="正特性 : ">
          <n-select
            v-model:value="model.selectedPositiveTags"
            multiple
            :options="positiveTagOptions"
            :render-tag="renderSelectTags({ category: 'like' })"
            clearable
          />
        </n-form-item>
        <!-- 反特性 -->
        <n-form-item label="反特性 : ">
          <n-select
            v-model:value="model.selectedNegativeTags"
            multiple
            :options="negativeTagOptions"
            :render-tag="renderSelectTags({ category: 'hate' })"
            clearable
          />
        </n-form-item>
        <!-- 厨具 -->
        <n-form-item label="厨具 : ">
          <n-select
            v-model:value="model.selectedTools"
            multiple
            :options="allToolOptions"
            :render-label="renderToolsLabel"
            clearable
          />
        </n-form-item>
        <!-- 匹配度 -->
        <n-form-item label="匹配度 : ">
          <n-select
            v-model:value="model.selectedMatchPoints"
            multiple
            :options="getMatchPointOptions"
            clearable
          />
        </n-form-item>
        <!-- 输入筛选 -->
        <n-form-item label="名称 : ">
          <n-input v-model:value="model.searchName" clearable />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
.filter-form {
  display: grid;
  row-gap: 20px;
}
.handle {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}
</style>