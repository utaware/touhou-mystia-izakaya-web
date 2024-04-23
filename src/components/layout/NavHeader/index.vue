<script setup lang="ts">
interface TNavItem {
  text: string,
  color: string
}

const navList: TNavItem[] = [
  { text: '顾客', color: 'green' },
  { text: '料理', color: 'orange' },
  { text: '酒水', color: 'blue' },
  { text: '食材', color: 'yellow' },
]
</script>

<template>
  <div class="nav-header">
    <!-- prefix -->
    <div class="nav-header-prefix">
      <span class="logo"></span>
      <h3 class="title">
        Touhou Mystia Izakaya
      </h3>
    </div>
    <!-- list -->
    <n-space class="nav-header-list">
      <n-button
        v-for="({ text }, index) in navList"
        class="item"
        :key="index"
        text>
          {{ text }}
      </n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.nav-header {
  display: flex;
  height: 54px;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-common-border);
  &-prefix {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    .logo {
      display: inline-block;
      width: 32px;
      height: 38px;
      background: url('public/favicon.png') no-repeat;
    }
    .title {
      margin-left: 16px;
      font-size: 18px;
    }
  }
  &-list {
    display: flex;
    align-items: center;
    height: 100%;
    .item {
      margin-right: 16px;
      font-size: 16px;
      color: var(--color-common-text);
    }
  }
}
</style>