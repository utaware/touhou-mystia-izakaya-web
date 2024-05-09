<script setup lang="ts">
import { getIndexWithName, recipes } from '@/material'

import { useCustomerRareStore } from '@/pinia'

import type { Tbookmark } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

interface propsType extends Tbookmark {
  size: number;
  vertical: boolean;
}

const props = defineProps<propsType>()

const customerStore = useCustomerRareStore()

const { deleteBookmark } = customerStore

const index = getIndexWithName('recipes', props.recipe)

const recipe_ingredients = recipes[index].ingredients

const extra_ingredients = props.ingredients

const empty = 5 - recipe_ingredients.length - extra_ingredients.length
</script>

<template>
  <div class="container">
    <!-- bar -->
    <div class="bar"></div>
    <!-- preview -->
    <n-space :vertical="vertical" class="wrapper">
      <!-- 料理 -->
      <sprite-item
        type="recipes"
        :name="recipe"
        :size="size"
        :title="recipe"
      />
      <!-- 酒水 -->
      <sprite-item
        type="beverages"
        :name="beverage"
        :size="size"
        :title="beverage"
      />
      <!-- 食材 -->
      <sprite-item
        v-for="(item, index) in recipe_ingredients"
        type="ingredients"
        :name="item"
        :key="`recipe-${index}`"
        :size="size"
        :title="item"
      />
      <!-- 可选 -->
      <sprite-item
        v-for="(item, index) in extra_ingredients"
        type="ingredients"
        :name="item"
        :key="`ingredient-${index}`"
        :size="size"
        :title="item"
      />
      <!-- empty -->
      <span class="empty"
        v-for="item in empty"
        :key="`empty-${item}`"
      ></span>
    </n-space>
    <!-- handler -->
    <n-space :vertical="vertical">
      <n-button size="small" quaternary type="error" @click="deleteBookmark(uuid)">删除</n-button>
      <n-button size="small" quaternary type="primary">选择</n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #ecf8ff;
  .wrapper {
    padding: 8px 4px;
  }
  .bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #50bfff;
    width: 100%;
    height: 6px;
    border-radius: 8px 8px 0 0;
  }
}

.empty {
  display: inline-block;
  width: 36px;
  height: 36px;
}
</style>