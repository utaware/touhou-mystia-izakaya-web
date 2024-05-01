<script setup lang="ts">
import { computed } from 'vue'

import { without, difference } from 'lodash'

interface TOptions {
  label: string,
  value: string | number,
  disabled?: boolean
}

const props = defineProps<{
  options: TOptions[],
  value: string[]
}>()

const emit = defineEmits<{
  'update:value': [value: Array<string | number>]
}>()

const optionsCount = computed(() => props.options.length)

const isClearMode = computed(() => {
  return props.options.every((v) => props.value.includes(String(v.value)))
})

const handleCheckboxChange = (value: Array<number | string>) => {
  emit('update:value', value)
}

const handleSelectOrClearAll = () => {
  const target = props.options.map(({ value }) => value)
  if (isClearMode.value) {
    const removeValue = without(props.value, ...target)
    handleCheckboxChange(removeValue)
  } else {
    const addValue = difference(target, props.value).map(v => String(v))
    const result = props.value.concat(addValue)
    handleCheckboxChange(result)
  }
}
</script>

<template>
  <!-- container -->
  <div class="customer-transfer">
    <!-- left -->
    <div class="left">
      <!-- header -->
      <div class="header">
        <!-- button -->
        <n-button
          size="tiny"
          secondary
          @click="handleSelectOrClearAll"
        >
          {{ isClearMode ? '清除' : '全选' }}
        </n-button>
        <!-- text -->
        <span class="count-text">共 {{ optionsCount }} 项</span>
      </div>
      <!-- list -->
      <div class="list">
        <n-checkbox-group class="group" :value="value" :on-update:value="handleCheckboxChange">
          <n-checkbox
            class="item"
            size="small"
            v-for="({ label, value: itemValue, disabled = false }, index) in options"
            :key="index"
            :value="itemValue"
            :label="label"
            :disabled="disabled"
          />
        </n-checkbox-group>
      </div>
    </div>
    <!-- right -->
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.customer-transfer {
  display: grid;
  grid-template-columns: max-content auto;
  height: 300px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  .left {
    display: flex;
    min-width: 120px;
    flex-direction: column;
    overflow: scroll;
    .header {
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      font-size: 12px;
      .count-text {
        color: var(--color-header-extra-text);
      }
    }
    .list {
      overflow-y: scroll;
      .group {
        padding-left: 6px;
        display: grid;
        .item {
          padding-left: 12px;
          line-height: 2.5;
          font-size: 12px;
          border-radius: 5px;
          &:hover {
            background-color: var(--color-item-pending);
          }
        }
      }
    }
  }
  .right {
    border-left: 1px solid var(--color-border);
    padding: 12px;
    overflow: scroll;
  }
}
</style>