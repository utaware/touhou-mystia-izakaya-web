<script setup lang="ts">
import { TCustomerRare } from '@/pinia'

import CommonTag from '@/components/common/tags/index.vue'

defineProps<{
  customer: TCustomerRare
}>()
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
        <span class="price bold">持有金: {{ customer.price }}(円)</span>
      </div>
      <!-- tags -->
      <div class="list">
        <n-space>
          <!-- like -->
            <common-tag
              :value="item"
              category="like"
              v-for="(item) in customer.like_tags"
              :key="item"
            />
        </n-space>
        <!-- hate -->
        <n-space>
          <common-tag
            :value="item"
            category="hate"
            v-for="(item) in customer.hate_tags"
            :key="item"
          />
        </n-space>
        <!-- beverage -->
        <n-space>
          <common-tag
            :value="item"
            category="beverage"
            v-for="(item) in customer.beverage_tags"
            :key="item"
          />
        </n-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.customer-panel {
  padding: 24px;
  border-left: 1px solid var(--color-border);
  .info {
    display: grid;
    grid-template-columns: max-content auto;
    column-gap: 40px;
    .header {
      display: grid;
      row-gap: 4px;
      justify-items: center;
      color: var(--color-text);
      .name {
        font-size: 18px;
      }
      .price {
        color: rgb(255, 217, 103);
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