<script setup lang="ts">
import { reactive } from 'vue'

import { useRecipesStore } from '@/pinia'

const recipesStore = useRecipesStore()

const {
  negativeTagOptions,
  positiveTagOptions,
  allToolOptions,
} = recipesStore

const model = reactive({
  selectedPositiveTags: [],
  selectedNegativeTags: [],
  selectedTools: [],
  searchName: '',
})


defineProps<{
  show: boolean,
}>()

const emit = defineEmits<{
  'update:show': [value: boolean],
  filter: [value: {}]
}>()

const handleModalEnter = () => {
  emit('filter', model)
  emit('update:show', false)
}

const handleModalClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <!-- wrapper -->
  <n-modal
    :show="show"
    :on-update:show="handleModalClose"
    display-directive="show"
  >
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
        :model="model"
        :label-width="80"
        :show-feedback="false"
      >
        <!-- 正特性 -->
        <n-form-item label="正特性 : ">
          <n-select v-model:value="model.selectedPositiveTags" multiple :options="positiveTagOptions"
          />
        </n-form-item>
        <!-- 反特性 -->
        <n-form-item label="反特性 : ">
          <n-select v-model:value="model.selectedNegativeTags" multiple :options="negativeTagOptions" />
        </n-form-item>
        <!-- 厨具 -->
        <n-form-item label="厨具 : ">
          <n-select v-model:value="model.selectedTools" multiple :options="allToolOptions" />
        </n-form-item>
        <!-- 匹配度 -->
        <n-form-item label="匹配度 : ">
          <n-select v-model:value="model.selectedTools" multiple :options="allToolOptions" />
        </n-form-item>
        <!-- 输入筛选 -->
        <n-form-item label="名称 : ">
          <n-input v-model:value="model.searchName" />
        </n-form-item>
      </n-form>
      <!-- handle -->
      <div class="handle">
        <n-button secondary type="error" @click="handleModalClose">取消</n-button>
        <n-button secondary type="info" @click="handleModalEnter">确定</n-button>
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