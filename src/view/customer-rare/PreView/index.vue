<script setup lang="ts">
import DemandPanel from './DemandPanel/index.vue'
import EditPanel from './EditPanel/index.vue'
import InfoPanel from './InfoPanel/index.vue'
</script>

<template>
  <!-- panel -->
  <div class="pre-view">
    <!-- demand -->
    <demand-panel />
    <!-- info -->
    <info-panel />
    <!-- edit -->
    <edit-panel />
  </div>
</template>

<style scoped lang="scss">
.pre-view {
  display: grid;
  grid-template-rows: min-content max-content auto;
  row-gap: 12px;
}
</style>