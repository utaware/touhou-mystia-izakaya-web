<script setup lang="ts">
import { defineProps } from 'vue'

interface PropsType {
  show: boolean;
  handleModalVisible: (value: boolean) => void
}

defineProps<PropsType>()
</script>

<template>
  <n-modal
    :show="show"
    :on-update:show="handleModalVisible"
  >
    <n-card
      style="width: 600px"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        噢！
      </template>
      内容
      <template #footer>
        尾部
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">

</style>