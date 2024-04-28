<script setup lang="ts">
import { reactive } from 'vue'

import { beverages } from '@/material'

const state = reactive({
  beverages
})
</script>

<template>
  <!-- page -->
  <div class="beverages-page">
    <!-- card -->
    <n-card>
      <!-- filter -->
      <!-- content -->
      <ul class="beverages-list">
        <li
          class="item"
          v-for="(item, index) in state.beverages"
          :key="index"
        >
          <i :class="item.namePY" class="beverages-sprite"></i>
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
  gap: 24px;
  justify-content: space-between;
  .item {
    font-weight: bolder;
    text-align: center;
    font-size: 12px;
  }
}
</style>