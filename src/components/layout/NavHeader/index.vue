<script setup lang="ts">
import { useRouter, RouteLocationRaw } from 'vue-router'

const router = useRouter()

interface TNavItem {
  text: string,
  path: string
}

const navList: TNavItem[] = [
  { text: '顾客', path: '/customer-rare' },
  { text: '料理', path: '/recipes' },
  { text: '酒水', path: '/beverages' },
  { text: '食材', path: '/ingredients'},
]

const handleRouterChange = (path: RouteLocationRaw) => {
  return router.push(path)
}
</script>

<template>
  <div class="nav-header">
    <!-- prefix -->
    <div class="nav-header-prefix" @click="handleRouterChange('/')">
      <span class="logo"></span>
      <h3 class="title">
        Touhou Mystia Izakaya
      </h3>
    </div>
    <!-- list -->
    <n-space class="nav-header-list">
      <n-button
        v-for="({ text, path }, index) in navList"
        class="item"
        :key="index"
        quaternary
        @click="handleRouterChange(path)"
      >
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
  border-bottom: 1px solid var(--color-tab-border);
  &-prefix {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    .logo {
      display: inline-block;
      width: 32px;
      height: 38px;
      background: url('/favicon.png') no-repeat;
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
      color: var(--color-text);
    }
  }
}
</style>