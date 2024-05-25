<script setup lang="ts">
import { ref } from 'vue'

import { createDiscreteApi } from 'naive-ui'

import { ingredients } from '@/material'
import type { TIngredientsItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'

import { createNotification } from '@/render/Notification/Ingredients'

import { CalendarWeekStart20Regular } from '@vicons/fluent'

import FilterModal from './filter.vue'

const filterVisible = ref(false)

const allIngredientsIndex = ingredients.map(({ index }) => index)

const filterIngredients= ref(allIngredientsIndex)

const { notification } = createDiscreteApi(['notification'])

const handleToggleVisible = () => {
  filterVisible.value = !filterVisible.value
}

const handleItemClick = (item: TIngredientsItem) => {
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
          v-for="(item, index) in ingredients"
          v-show="filterIngredients.includes(item.index)"
          :key="index"
          @click="handleItemClick(item)"
        >
          <!-- icon -->
          <n-badge :value="item.ingredient_tags.length" :show-zero="true">
            <SpriteItem :index="item.index" type="ingredients" :size="64" :value="item.name" :title="item.name" />
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
        <filter-modal v-model:value="filterIngredients" />
      </n-drawer>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/material.scss');
</style>