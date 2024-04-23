<script setup lang="ts">
import character_rare from '@/json/character_rare.json'

import { getAssetsUrl, word2PY } from '@/utils'

import { SettingOutlined } from '@vicons/antd'

import { ref, Ref } from 'vue'

const getImagePath = (name: string): string => {
  return getAssetsUrl(`character-rare/${word2PY(name)}.png`)
}

type TCharacterRare = typeof character_rare[number] & {
  disabled: Ref<boolean>,
  src: string
}

const customerList :TCharacterRare[] = character_rare.map((v) => {
  const result = { ...v, disabled: ref(false), src: getImagePath(v.name) }
  return result
})

const handlerClickAvatar = (item: TCharacterRare) => {
  item.disabled.value = !item.disabled.value
}
</script>

<template>
  <!-- control -->
  <div class="control">
    <!-- button -->
    <n-button class="config">
      <n-space>
        <n-icon :component="SettingOutlined"/>设置
      </n-space>
    </n-button>
    <!-- radio -->
    <n-space>
      <n-switch/>快速编辑
    </n-space>
  </div>
  <!-- avatar -->
  <span
    v-for="(item, index) in customerList"
    :key="index"
    class="bg"
    :class="{ disabled: item.disabled.value }"
    @click="handlerClickAvatar(item)"
  >
    <n-avatar
      :size="84"
      :src="item.src"
      :alt="item.name"
    />
  </span>
</template>

<style scoped lang="scss">
.control {
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
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