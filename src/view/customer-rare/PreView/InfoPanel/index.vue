<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TagItem from '@/components/common/tags/index.vue'

import { useCustomerRareStore } from '@/pinia'

import { getCustomerRareSrc } from '@/utils'

import { useActiveCustomerInfo } from './hooks/active'

const {
  match_like_tags,
  match_hate_tags,
  match_beverage_tags,
  total_point,
  isActiveTags,
} = useActiveCustomerInfo()

const customerRareStore = useCustomerRareStore()

const { currentCustomer: customer } = storeToRefs(customerRareStore)
</script>

<template>
  <!-- info -->
  <div class="info-panel">
    <!-- header -->
    <div class="header">
      <!-- avatar -->
      <n-avatar
        :src="getCustomerRareSrc(customer)"
        :size="64"
        round
      />
      <!-- name -->
      <h2 class="name bold">{{ customer.name }} - {{ total_point }}</h2>
      <!-- place -->
      <span class="place bold">{{ customer.dlc }} {{ customer.place }}</span>
      <!-- price -->
      <span class="text-price bold">持有金 : {{ customer.price }}(円)</span>
    </div>
    <!-- tags -->
    <div class="list">
      <!-- like -->
      <n-space>
          <tag-item
            :disabled="!isActiveTags(item, match_like_tags)"
            :value="item"
            category="like"
            v-for="(item) in customer.like_tags"
            :key="item"
          />
      </n-space>
      <!-- hate -->
      <n-space>
        <tag-item
          :disabled="!isActiveTags(item, match_hate_tags)"
          :value="item"
          category="hate"
          v-for="(item) in customer.hate_tags"
          :key="item"
        />
      </n-space>
      <!-- beverage -->
      <n-space>
        <tag-item
          :disabled="!isActiveTags(item, match_beverage_tags)"
          :value="item"
          category="beverage"
          v-for="(item) in customer.beverage_tags"
          :key="item"
        />
      </n-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-panel {
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
</style>