<script setup lang="ts">
import NavHeader from '@/components/layout/NavHeader/index.vue';
</script>

<template>
  <div class="main">
    <NavHeader/>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="scss">

</style>