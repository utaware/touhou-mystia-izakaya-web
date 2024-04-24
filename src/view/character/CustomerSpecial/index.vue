<script setup lang="ts">
import { customerSpecial } from '@/material'
</script>

<template>
  <div class="customer-special">
    <div class="avatar-panel">
      <span
        v-for="(item, index) in customerSpecial"
        :key="index"
        class="item"
      >
        <n-avatar
          class="avatar"
          :size="84"
          :src="item.src"
          :alt="item.name"
        />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar-panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-around;
  gap: 8px;
  .item {
    display: inline-block;
    padding: 8px;
    width: 100px;
    height: 100px;
    background: url('@/assets/bg.png') no-repeat;
    background-size: 100%;
    cursor: pointer;
  }
}
</style>