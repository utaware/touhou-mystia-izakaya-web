<script setup lang="ts">
import { Ref } from 'vue'

import { storeToRefs } from 'pinia'

import TagItem from '@/components/common/tags/index.vue'

import { useCustomerRareStore, useRecipesStore, useBeveragesStore } from '@/pinia'

import { isMatchItem } from '@/utils'

import EditPanel from './panel.vue'

const customerRareStore = useCustomerRareStore()
const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()

const { currentCustomer: customer } = storeToRefs(customerRareStore)
const { currentRecipe } = storeToRefs(recipesStore)
const { currentBeverage } = storeToRefs(beveragesStore)
</script>

<template>
  <!-- panel -->
  <div class="customer-panel">
    <!-- info -->
    <div class="info">
      <!-- header -->
      <div class="header">
        <!-- avatar -->
        <n-avatar
          :src="customer.src"
          :size="64"
          round
        />
        <!-- name -->
        <h2 class="name bold">{{ customer.name }}</h2>
        <!-- place -->
        <span class="place bold">{{ customer.dlc }} {{ customer.place }}</span>
        <!-- price -->
        <span class="text-price bold">持有金: {{ customer.price }}(円)</span>
      </div>
      <!-- tags -->
      <div class="list">
        <n-space>
          <!-- like -->
            <tag-item
              :disabled="!isMatchItem(item, currentRecipe?.match_like_tags)"
              :value="item"
              category="like"
              v-for="(item) in customer.like_tags"
              :key="item"
            />
        </n-space>
        <!-- hate -->
        <n-space>
          <tag-item
            :disabled="!isMatchItem(item, currentRecipe?.match_hate_tags)"
            :value="item"
            category="hate"
            v-for="(item) in customer.hate_tags"
            :key="item"
          />
        </n-space>
        <!-- beverage -->
        <n-space>
          <tag-item
            :disabled="!isMatchItem(item, currentBeverage?.beverage_tags)"
            :value="item"
            category="beverage"
            v-for="(item) in customer.beverage_tags"
            :key="item"
          />
        </n-space>
      </div>
    </div>
    <!-- select -->
    <edit-panel />
  </div>
</template>

<style scoped lang="scss">
.customer-panel {
  display: grid;
  grid-template-rows: max-content auto;
  row-gap: 12px;
  .info {
    padding: 16px;
    display: grid;
    grid-template-columns: max-content auto;
    column-gap: 40px;
    border: 1px solid var(--color-tab-border);
    border-radius: 4px;
    .header {
      display: grid;
      row-gap: 4px;
      justify-items: center;
      color: var(--color-text);
      .name {
        font-size: 18px;
      }
    }
    .list {
      display: grid;
      row-gap: 8px;
      align-items: center;
    }
  }
}
</style>