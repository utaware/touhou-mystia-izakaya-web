<script setup lang="ts">
import { useRouter, RouteLocationRaw } from 'vue-router'

import { GithubFilled } from '@vicons/antd'

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
    <n-space align="center" class="nav-header-list">
      <!-- path -->
      <n-button
        v-for="({ text, path }, index) in navList"
        class="item bold"
        :key="index"
        quaternary
        @click="handleRouterChange(path)"
      >
        {{ text }}
      </n-button>
      <!-- icon -->
      <n-button
        tag="a"
        :bordered="false"
        target="open"
        aria-label="github"
        rel="nofollow"
        href="https://github.com/utaware/touhou-mystia-izakaya-web"
      >
        <template #icon>
          <n-icon size="20">
            <GithubFilled />
          </n-icon>
        </template>
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
    margin-right: 12px;
    align-items: center;
    .item {
      font-size: 16px;
      color: var(--color-text);
    }
  }
}
</style>