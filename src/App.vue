<script setup lang="ts">
import { zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN">
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped lang="scss">

</style>
