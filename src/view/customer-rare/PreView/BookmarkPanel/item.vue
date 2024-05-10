<script setup lang="ts">
import { useCustomerRareStore } from '@/pinia'

import type { Tbookmark } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import { getEmptyIngredientsCount } from '@/utils/recipes'

interface propsType extends Tbookmark {
  size: number;
  vertical: boolean;
}

const props = defineProps<propsType>()

const customerStore = useCustomerRareStore()

const { deleteBookmark, restoreBookmark } = customerStore

const { ingredients, extra } = props

const empty = getEmptyIngredientsCount(ingredients.length, extra.length)
</script>

<template>
  <div class="container">
    <!-- point -->
    <div class="point" :style="{backgroundColor: color}"></div>
    <!-- bar -->
    <div class="bar" :style="{backgroundColor: color}"></div>
    <!-- preview -->
    <n-space :vertical="vertical" align="center" class="wrapper">
      <!-- 需求 -->
      <n-space :vertical="vertical" align="center" class="demand">
        <tag-item category="like" :value="demandRecipeTag" />
        <tag-item category="beverage" :value="demandBeverageTag" />
      </n-space>
      <!-- 料理 -->
      <sprite-item type="recipes" :name="recipe" :size="size" :title="recipe" />
      <!-- 酒水 -->
      <sprite-item type="beverages" :name="beverage" :size="size" :title="beverage" />
      <!-- 食材 -->
      <sprite-item
        v-for="(item, index) in ingredients"
        type="ingredients"
        :name="item"
        :key="`recipe-${index}`"
        :size="size"
        :title="item"
      />
      <!-- 可选 -->
      <sprite-item
        v-for="(item, index) in extra"
        type="ingredients"
        :name="item"
        :key="`ingredient-${index}`"
        :size="size"
        :title="item"
      />
      <!-- empty -->
      <span class="empty" v-for="item in empty" :key="`empty-${item}`"></span>
    </n-space>
    <!-- handler -->
    <n-space :vertical="vertical">
      <n-button size="small" quaternary type="error" @click="deleteBookmark(uuid)">删除</n-button>
      <n-button size="small" quaternary type="primary" @click="restoreBookmark(props)">选择</n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  padding: 20px 4px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #ecf8ff;
  .point {
    position: absolute;
    top: 18px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
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
  .demand {
    margin: 12px 0;
  }
  .empty {
    display: inline-block;
    width: 36px;
    height: 36px;
  }
}

</style>