<script setup lang="ts">
import { useBeveragesStore } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

const beveragesStore = useBeveragesStore()

const { beverages } = beveragesStore
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
          v-for="(item, index) in beverages"
          :key="index"
        >
          <!-- icon -->
          <SpriteItem :index="item.index" type="beverages" :size="64" :value="item.name" :title="item.name" />
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