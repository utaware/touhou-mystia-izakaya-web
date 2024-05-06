<script setup lang="ts">
import EditPanel from './EditPanel/index.vue'
import InfoPanel from './InfoPanel/index.vue'
</script>

<template>
  <!-- panel -->
  <div class="pre-view">
    <!-- info -->
    <Info-Panel />
    <!-- edit -->
    <edit-panel />
  </div>
</template>

<style scoped lang="scss">
.pre-view {
  display: grid;
  grid-template-rows: max-content auto;
  row-gap: 12px;
}
</style>