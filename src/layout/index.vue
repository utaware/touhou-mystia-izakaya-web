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
.page-wapper {
  padding: 12px;
}
</style>