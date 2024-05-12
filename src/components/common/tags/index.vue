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
  background-color: rgb(230, 180, 166);
  color: rgb(131, 0, 0);
}
.hate {
  background-color: rgb(93, 69, 58);
  color: rgb(229, 13, 13);
}
.beverage {
  background-color: rgb(176, 207, 215);
  color: rgb(155, 89, 37);
}
</style>