<script setup lang="ts">
import { TCustomerRare } from '@/pinia'

defineProps<{
  customer: TCustomerRare
}>()
</script>

<template>
  <!-- panel -->
  <div class="customer-panel">

  </div>
</template>

<style scoped lang="scss">
.customer-panel {
  border-left: 1px solid var(--color-border);
}
</style>