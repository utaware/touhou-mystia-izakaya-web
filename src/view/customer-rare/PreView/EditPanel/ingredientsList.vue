<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, useIngredientsStore } from '@/pinia'

import SpriteUnknow from '@/components/common/sprite/unknow.vue'
import SpritePending from '@/components/common/sprite/pending.vue'

import InsetModal from '@/components/common/insetModal/index.vue'

import { CloseCircleFilled } from '@vicons/antd'

import { useCustomerActiveTab } from '@/hooks/customer-tabs'

withDefaults(defineProps<{
  size?: number,
}>(), {
  size: 48,
})

const recipesStore = useRecipesStore()
const ingredientsStore = useIngredientsStore()

const { currentRecipeIngredients, currentRecipeEmptyCount } = storeToRefs(recipesStore)
const { extraIngredientsNames } = storeToRefs(ingredientsStore)

const { removeExtraIngredients } = ingredientsStore

const { setActiveTabName } = useCustomerActiveTab()
</script>

<template>
  <!-- 菜谱 √ -->
  <div class="ingredients">
    <n-space>
      <!-- 菜谱 -->
      <sprite-pending
        v-for="(item, index) in currentRecipeIngredients"
        type="ingredients"
        :name="item"
        :key="`recipe-${index}`"
        :size="size"
      />
      <!-- 可选 -->
      <inset-modal v-for="(item, index) in extraIngredientsNames" :key="`ingredient-${index}`">
        <sprite-pending type="ingredients" :name="item" :size="size" />
        <template #modal>
          <n-icon class="pointer" size="24" color="white" @click="removeExtraIngredients(index)">
            <CloseCircleFilled />
          </n-icon>
        </template>
      </inset-modal>
      <!-- 占位 -->
      <sprite-unknow
        v-for="item in currentRecipeEmptyCount"
        :key="`unknow-${item}`"
        :size="size"
        @click="() => setActiveTabName('ingredients')"
      />
    </n-space>
  </div>
</template>

<style scoped lang="scss">
</style>