<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

import { useIngredientsStore } from '@/pinia'

import type { TIngredientsItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from './render/notification.tsx'

const ingredientsStore = useIngredientsStore()

const { ingredients } = ingredientsStore

const { notification } = createDiscreteApi(['notification'])

const handleItemClick = (item: TIngredientsItem) => {
  const options = createNotification(item)
  notification.create(options)
}
</script>

<template>
  <!-- page -->
  <div class="recipes-page">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="material-list">
        <li
          class="item"
          v-for="(item, index) in ingredients"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <SpriteItem :index="item.index" type="ingredients" :size="64" :value="item.name" :title="item.name" />
          <!-- text -->
          <span class="label">{{ item.name }}</span>
        </li>
      </ul>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/material.scss');
</style>