<script setup lang="ts">
import character_rare from '@/json/character_rare.json'

import { getAssetsUrl, word2PY } from '@/utils'

const getImagePath = (name: string): string => {
  return getAssetsUrl(`character-rare/${word2PY(name)}.png`)
}
</script>

<template>
  <div class="container">
    <span v-for="({ name }, index) in character_rare" :key="index" class="bg">
      <n-avatar
        :size="84"
        :src="getImagePath(name)"
      />
    </span>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  padding: 8px;
  width: 100vw;
  flex-wrap: wrap;
  align-items: flex-start;
}
.bg {
  margin: 8px;
  display: inline-block;
  padding: 8px;
  width: 100px;
  height: 100px;
  background-image: url('@/assets/bg.png');
  background-size: 100px 100px;
  background-repeat: no-repeat;
  &.disabled {
    opacity: 0.5;
  }
}
</style>