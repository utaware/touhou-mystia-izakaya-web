<script setup lang="ts">
import { useCustomerRareStore } from '@/pinia'

import type { TBookmark } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import { getEmptyIngredientsCount } from '@/utils/recipes'

import { getPublicAssets } from '@/utils/pub-use'

interface propsType extends TBookmark {
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
    <n-space :vertical="vertical" align="center" class="wrapper" :wrap-item="false">
      <!-- 需求 -->
      <n-space :vertical="vertical" align="center" class="demand">
        <tag-item category="like" :value="demandRecipeTag" />
        <tag-item category="beverage" :value="demandBeverageTag" />
      </n-space>
      <!-- 信息 -->
      <n-space :vertical="vertical" :wrap-item="false">
        <!-- 厨具 -->
        <img :width="size" :src="getPublicAssets('tools', tool)" :alt="tool" :title="tool">
        <!-- line -->
        <span class="line"></span>
        <!-- 料理 -->
        <img :width="size" :src="getPublicAssets('recipes', recipe)" :alt="recipe" :title="recipe">
        <!-- line -->
        <span class="line"></span>
        <!-- 酒水 -->
        <img :width="size" :src="getPublicAssets('beverages', beverage)" :alt="beverage" :title="beverage">
        <!-- line -->
        <span class="line"></span>
        <!-- 食材 -->
        <n-space :vertical="vertical" class="ingredients">
          <!-- 食材 -->
          <img
            v-for="(item, index) in ingredients"
            :width="size"
            :src="getPublicAssets('ingredients', item)"
            :alt="beverage"
            :title="beverage"
            :key="`recipe-${index}`"
          >
          <!-- 额外选择 -->
          <img
            v-for="(item, index) in extra"
            :width="size"
            :src="getPublicAssets('ingredients', item)"
            :alt="beverage"
            :title="beverage"
            :key="`extra-${index}`"
          >
          <!-- empty -->
          <span class="empty" v-for="item in empty" :key="`empty-${item}`"></span>
        </n-space>
      </n-space>
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
    margin-top: 12px;
  }
  .empty {
    display: inline-block;
    width: 36px;
    height: 36px;
  }
  .line {
    display: inline-block;
    width: 100%;
    border-bottom: 1px dashed purple;
  }
}
</style>