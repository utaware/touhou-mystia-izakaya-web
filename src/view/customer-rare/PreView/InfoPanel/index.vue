<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TagItem from '@/components/common/tags/index.vue'

import { useCustomerRareStore, useRecipesStore, useBeveragesStore } from '@/pinia'

import { getCustomerRareSrc } from '@/utils/pub-use'

import { useDemandSelect } from '@/hooks/demand'

const customerRareStore = useCustomerRareStore()
const recipesStore = useRecipesStore()
const beveragesStore = useBeveragesStore()

const { currentRecipeAllTags } = storeToRefs(recipesStore)
const { currentBeverageAllTags } = storeToRefs(beveragesStore)

const { handleChangePositiveTag, handleChangeBeverageTag } = useDemandSelect()

const { currentCustomer: customer, getPreviewColor } = storeToRefs(customerRareStore)
</script>

<template>
  <div class="wrapper" :style="{ backgroundColor: getPreviewColor }">
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
        <h2 class="name bold">{{ customer.name }}</h2>
        <!-- place -->
        <span class="place bold">{{ customer.dlc }} {{ customer.place }}</span>
        <!-- price -->
        <span class="text-price bold">持有金 : {{ customer.price }}(円)</span>
      </div>
      <!-- divider -->
      <n-divider vertical :style="{ height: '100%' }"></n-divider>
      <!-- tags -->
      <div class="list">
        <!-- like -->
        <n-space>
          <tag-item
            :disabled="!currentRecipeAllTags.includes(item)"
            :value="item"
            category="like"
            v-for="(item) in customer.like_tags"
            :key="item"
            @click="handleChangePositiveTag(item)"
          />
        </n-space>
        <!-- hate -->
        <n-space>
          <tag-item
            :disabled="!currentRecipeAllTags.includes(item)"
            :value="item"
            category="hate"
            v-for="(item) in customer.hate_tags"
            :key="item"
          />
        </n-space>
        <!-- beverage -->
        <n-space>
          <tag-item
            :disabled="!currentBeverageAllTags.includes(item)"
            :value="item"
            category="beverage"
            v-for="(item) in customer.beverage_tags"
            :key="item"
            @click.stop="handleChangeBeverageTag(item)"
          />
        </n-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 12px;
  border-radius: 4px;
}
.info-panel {
  padding: 16px;
  display: grid;
  grid-template-columns: max-content max-content auto;
  column-gap: 20px;
  border: 1px solid var(--color-tab-border);
  border-radius: 4px;
  background-color: white;
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