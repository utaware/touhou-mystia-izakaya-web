<script setup lang="ts">
import { defineProps } from 'vue'

interface PropsType {
  category: 'like' | 'hate' | 'beverage';
  value: string[];
}

defineProps<PropsType>()
</script>

<template>
  <n-space class="tag-list">
    <n-tag
      class="item"
      :bordered="false"
      :class="category"
      v-for="(item, index) in value"
      :key="index"
    >
      {{ item }}
    </n-tag>
  </n-space>
</template>

<style scoped lang="scss">
.tag-list {
  .item {
    border-width: 2px;
    border-style: solid;
    font-weight: bold;
  }
  .like {
    background-color: rgb(230, 180, 166);
    border-color: rgb(157, 84, 55);
    color: rgb(131, 0, 0);
  }
  .hate {
    background-color: rgb(93, 69, 58);
    border-color: rgb(0, 0, 0);
    color: rgb(229, 13, 13);
  }
  .beverage {
    background-color: rgb(176, 207, 215);
    border-color: rgb(90, 126, 135);
    color: rgb(155, 89, 37);
  }
}
</style>