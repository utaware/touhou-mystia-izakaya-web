<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

import { useRecipesStore } from '@/pinia'

import type { TRecipeItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from '@/render/Notification/Recipes'

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
  <div class="recipes-page pd12">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="material-list">
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
@import url('@/styles/material.scss');
</style>