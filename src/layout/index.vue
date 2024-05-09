<script setup lang="ts">
import NavHeader from '@/components/layout/NavHeader/index.vue';

</script>

<template>
  <div class="main">
    <NavHeader/>
    <div class="page-wapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
}
.page-wapper {
  position: relative;
  padding: 12px;
  flex: 1;
}
</style>