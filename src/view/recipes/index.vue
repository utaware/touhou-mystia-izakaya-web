<script setup lang="ts">
import { ref } from 'vue'

import { createDiscreteApi } from 'naive-ui'

import { useRecipesStore } from '@/pinia'

import type { TRecipeItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from '@/render/Notification/Recipes'

import { CalendarWeekStart20Regular } from '@vicons/fluent'

import FilterModal from './filter.vue'

const filterVisible = ref(false)

const recipesStore = useRecipesStore()

const { recipes } = recipesStore

const allRecipesIndex = recipes.map(({ index }) => index)

const filterRecipes = ref(allRecipesIndex)

const { notification } = createDiscreteApi(['notification'])

const handleToggleVisible = () => {
  filterVisible.value = !filterVisible.value
}

const handleItemClick = (item: TRecipeItem) => {
  const options = createNotification(item)
  notification.create(options)
}
</script>

<template>
  <!-- container -->
  <div class="pd12">
    <!-- card -->
    <n-card>
      <!-- content -->
      <ul class="material-list">
        <li
          class="item"
          v-for="(item, index) in recipes"
          v-show="filterRecipes.includes(index)"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <n-badge type="success" :value="item.price">
            <SpriteItem :index="item.index" type="recipes" :size="64" :value="item.name" :title="item.name" />
          </n-badge>
          <!-- text -->
          <span class="label">{{ item.name }}</span>
        </li>
      </ul>
      <!-- button -->
      <div class="fixed" @click="handleToggleVisible">
        <n-icon size="26" :component="CalendarWeekStart20Regular" />
      </div>
      <!-- filter -->
      <n-drawer
        v-model:show="filterVisible"
        :width="320"
        placement="left"
        mask-closable
        display-directive="show"
      >
        <filter-modal v-model:value="filterRecipes" />
      </n-drawer>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/material.scss');
</style>