<script setup lang="ts">
const emit = defineEmits<{
  'update:value': [value: number],
}>()

withDefaults(defineProps<{
  value: number;
  max?: number;
  step?: number;
}>(), {
  step: 1,
  max: 100,
})

const getPercent = (val: number, total: number) => {
  return val / total * 100 + '%'
}

const handleRangeChange = (e: Event) => {
  const { value } = <HTMLInputElement>e.target
  emit('update:value', Number(value))
}
</script>

<template>
  <div class="container">
    <div class="track">
      <div class="volume" :style="{ width: getPercent(value, max) }"></div>
      <div class="thumb" :style="{ left: getPercent(value, max) }"></div>
      <input
        @change="handleRangeChange"
        :value="value"
        :step="step"
        :max="max"
        type="range"
        class="range"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 13px 0;
  .track {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.28);
    .volume {
      width: 100%;
      height: 4px;
      background-color: black;
      border-radius: 2px;
      transition: width 150ms linear 0ms;
    }
    .thumb {
      position: absolute;
      left: 0;
      top: 50%;
      width: 8px;
      height: 8px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: black;
      transition: left 150ms linear 0ms;
    }
    .range {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      opacity: 0;
      cursor: pointer;
      overflow: hidden;
    }
    &:hover {
      .thumb {
        box-shadow: 0px 0px 0px 8px rgb(0 0 0 / 16%);
      }
    }
  }
}
</style>