<script setup lang="ts">
import DemandPanel from './DemandPanel/index.vue'
import EditPanel from './EditPanel/index.vue'
import InfoPanel from './InfoPanel/index.vue'
import BookmarkPanel from './BookmarkPanel/index.vue'
</script>

<template>
  <!-- panel -->
  <div class="pre-view">
    <!-- demand -->
    <DemandPanel />
    <!-- edit -->
    <InfoPanel />
    <!-- info -->
    <EditPanel />
    <!-- bookmark -->
    <BookmarkPanel />
  </div>
</template>

<style scoped lang="scss">
.pre-view {
  display: grid;
  grid-template-rows: repeat(3, min-content) auto;
  row-gap: 12px;
}
</style>