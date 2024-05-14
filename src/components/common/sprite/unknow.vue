<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number
}>(), {
  size: 64
})

const styles = {
  width: props.size + 'px',
  height: props.size + 'px',
}
</script>

<template>
  <span class="unknow" :style="styles"></span>
</template>

<style scoped lang="scss">
.unknow {
  display: inline-block;
  vertical-align: middle;
  background: url('@/assets/bg/unknown.jpg') no-repeat;
  background-size: cover;
}
</style>