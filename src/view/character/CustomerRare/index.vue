<script setup lang="ts">
import { characterRare } from '@/json'

import { getAssetsUrl, word2PY } from '@/utils'

import { SettingOutlined } from '@vicons/antd'

import { reactive, ref, Ref, toRefs } from 'vue'

import CustomerRareModal from './modal.vue'

const getImagePath = (name: string): string => {
  return getAssetsUrl(`character-rare/${word2PY(name)}.png`)
}

const state = reactive({
  customerModalShow: true,
  isFastEditMode: false,
})

const { customerModalShow } = toRefs(state)

type TCharacterRare = typeof characterRare[number] & {
  disabled: Ref<boolean>,
  src: string
}

const customerList :TCharacterRare[] = characterRare.map((v) => {
  const result = { ...v, disabled: ref(false), src: getImagePath(v.name) }
  return result
})

const handlerClickAvatar = function (item: TCharacterRare) {
  if (state.isFastEditMode) {
    item.disabled.value = !item.disabled.value
  } else {
    customerModalShow.value = true
  }
}

const handlerSwitchChange = function (value: boolean) {
  state.isFastEditMode = value
}

const handleModalVisible = (value: boolean) => {
  state.customerModalShow = value
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
      <n-switch :on-update:value="handlerSwitchChange"/>快速编辑
    </n-space>
  </div>
  <!-- avatar -->
  <div class="avatar-panel">
    <span
      v-for="(item, index) in customerList"
      :key="index"
      class="bg"
      :class="{ disabled: item.disabled.value }"
      @click="handlerClickAvatar(item)"
    >
      <n-avatar
        class="avatar"
        :size="84"
        :src="item.src"
        :alt="item.name"
      />
    </span>
  </div>
  <!-- modal -->
  <CustomerRareModal
    :show="customerModalShow"
    :handleModalVisible="handleModalVisible"
  />
</template>

<style scoped lang="scss">
.control {
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
}
.avatar-panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-around;
  gap: 8px;
}
.bg {
  display: inline-block;
  padding: 8px;
  width: 100px;
  height: 100px;
  background: url('@/assets/bg.png') no-repeat;
  background-size: 100%;
  &.disabled {
    opacity: 0.5;
  }
  &:last-child {
    margin-right: auto;
  }
}
</style>