<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  show: boolean,
  checkedPlaces: string[],
  allPlaces: string[],
}>()

const enabledPlaceList = ref<string[]>(props.checkedPlaces)

const emit = defineEmits<{
  enter: [value: string[]],
  'update:show': [value: boolean],
}>()

const handleModalEnter = () => {
  emit('enter', enabledPlaceList.value)
}

const handleModalToggle = (value: boolean) => {
  emit('update:show', value)
}
</script>

<template>
  <n-modal :show="show" :on-update:show="handleModalToggle">
    <!-- card -->
    <n-card
      style="width: 600px"
      :bordered="false"
    >
      <!-- place -->
      <n-checkbox-group v-model:value="enabledPlaceList">
        <n-space align="center">
          <n-checkbox
            v-for="(item, index) in allPlaces"
            :key="index"
            :value="item"
            :label="item"
          />
        </n-space>
      </n-checkbox-group>
      <!-- enter -->
      <n-button @click="handleModalEnter">确认</n-button>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
</style>