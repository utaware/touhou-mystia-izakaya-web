<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

import { useRecipesStore } from '@/pinia'

import type { TRecipeItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from './render/notification'

const recipesStore = useRecipesStore()

const { recipes } = recipesStore

const { notification } = createDiscreteApi(['notification'])

const handleItemClick = (item: TRecipeItem) => {
  const options = createNotification(item)
  notification.create(options)
}
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="beverages-list">
        <li
          class="item"
          v-for="(item, index) in recipes"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <SpriteItem :index="item.index" type="recipes" :size="64" :value="item.name" :title="item.name" />
          <!-- text -->
          <span class="label">{{ item.name }}</span>
        </li>
      </ul>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.beverages-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  gap: 24px;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .label {
      font-weight: bolder;
      text-align: center;
    }
  }
}
</style>