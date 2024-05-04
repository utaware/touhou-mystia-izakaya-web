<script setup lang="ts">
import { reactive } from 'vue'

import { useRecipesStore } from '@/pinia'

const recipesStore = useRecipesStore()

const {
  negativeTagOptions,
  positiveTagOptions,
  allToolOptions,
} = recipesStore

const state = reactive({
  selectedPositiveTags: [],
  selectedNegativeTags: [],
  selectedTools: [],
})
</script>

<template>
  <!-- wrapper -->
  <n-modal>
    <!-- card -->
    <n-card
      style="width: 600px"
      :bordered="false"
      :segmented="false"
      size="huge"
    >
      <!-- form -->
      <n-form
        class="filter-form"
        label-placement="left"
        :label-width="80"
        :show-feedback="false"
      >
        <!-- 正特性 -->
        <n-form-item label="正特性 : ">
          <n-select v-model:value="state.selectedPositiveTags" multiple :options="positiveTagOptions"
          />
        </n-form-item>
        <!-- 反特性 -->
        <n-form-item label="反特性 : ">
          <n-select v-model:value="state.selectedNegativeTags" multiple :options="negativeTagOptions" />
        </n-form-item>
        <!-- 厨具 -->
        <n-form-item label="厨具 : ">
          <n-select v-model:value="state.selectedTools" multiple :options="allToolOptions" />
        </n-form-item>
      </n-form>
      <!-- handle -->
      <div class="handle">
        <n-button secondary type="error">取消</n-button>
        <n-button secondary type="info">确定</n-button>
      </div>
    </n-card>
  </n-modal>
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