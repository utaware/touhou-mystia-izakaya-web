<script setup lang="ts">
import character_rare from '@/json/character_rare.json'

import { getAssetsUrl, word2PY } from '@/utils'

const getImagePath = (name: string): string => {
  return getAssetsUrl(`character-rare/${word2PY(name)}.png`)
}
</script>

<template>
  <span v-for="({ name }, index) in character_rare" :key="index" class="bg">
    <n-avatar
      :size="84"
      :src="getImagePath(name)"
    />
  </span>
</template>

<style scoped lang="scss">
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