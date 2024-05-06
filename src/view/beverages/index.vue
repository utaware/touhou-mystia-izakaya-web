<script setup lang="ts">
import { useBeveragesStore } from '@/pinia'

const beveragesStore = useBeveragesStore()

const { beverages } = beveragesStore
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- filter -->
      <!-- tags -->
      <n-space>
        <n-tag>清除</n-tag>
      </n-space>
      <!-- divider -->
      <n-divider />
      <!-- content -->
      <ul class="beverages-list">
        <li
          class="item"
          v-for="(item, index) in beverages"
          :key="index"
        >
          <n-badge :value="item.level" type="info">
            <i :class="item.namePY" class="beverages-sprite-item"></i>
          </n-badge>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.beverages-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 84px);
  gap: 16px;
  justify-content: space-between;
  .item {
    font-weight: bolder;
    text-align: center;
    font-size: 12px;
  }
}
</style>