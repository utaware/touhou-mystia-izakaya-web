<script setup lang="ts">
import { useNotification } from 'naive-ui'

import { useIngredientsStore } from '@/pinia'

import type { TMatchIngredientsItem } from '@/utils/ingredients'

import { createNotification } from './render/notification'

import SpriteItem from '@/components/common/sprite/index.vue'

const notification = useNotification()

const ingredientsStore = useIngredientsStore()

const { addExtraIngredients } = ingredientsStore

defineProps<{
  ingredients: TMatchIngredientsItem[]
}>()

const handleViewIngredients = (item: TMatchIngredientsItem) => {
  const instance = createNotification(item)
  const n = notification.create(instance)
}
</script>

<template>
  <ul class="ingredients-view">
    <!-- 正常料理 -->
    <li
      class="item"
      v-for="(item, index) in ingredients"
      :key="index"
      @click="handleViewIngredients(item)"
    >
      <sprite-item :index="item.index" :size="48" :title="item.name" type="ingredients" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('./style/index.scss');
</style>