<script setup lang="ts">
import type { TCustomerTagType } from '@/material'

interface PropsType {
  category?: TCustomerTagType;
  value?: string;
  active?: boolean,
  bordered?: boolean,
}

withDefaults(defineProps<PropsType>(), {
  category: 'default',
  active: true,
  value: '',
  bordered: false,
})

</script>

<template>
  <n-tag
    class="item"
    :bordered="bordered"
    :class="[
      category,
      active ? 'is-active' : 'no-active',
    ]"
  >
    <slot>{{ value }}</slot>
  </n-tag>
</template>

<style scoped lang="scss">
.item {
  font-weight: bold;
  cursor: pointer;
  &.is-active {
    opacity: 1;
  }
  &.no-active {
    opacity: 0.5;
  }
}
.like {
  background-color: #EBB7A9;
  color: #830000;
}
.hate {
  background-color: #121212;
  color: #FF0F0F;
}
.beverage {
  background-color: #C5E6F0;
  color: #830000;
}
</style>