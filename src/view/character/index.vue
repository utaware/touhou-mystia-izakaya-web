<script setup lang="ts">
import CustomerRare from './CustomerRare/index.vue';
import CustomerSpecial from './CustomerSpecial/index.vue';
</script>

<template>
  <!-- page -->
  <div class="character-page">
    <!-- card -->
    <n-card content-style="padding: 0;">
      <!-- tabs -->
      <n-tabs
        type="line"
        size="large"
        :tabs-padding="20"
        pane-style="padding: 20px;"
      >
        <n-tab-pane name="稀有顾客" display-directive="show">
          <CustomerRare />
        </n-tab-pane>
        <n-tab-pane name="普通顾客" display-directive="show">
          普通顾客
        </n-tab-pane>
        <n-tab-pane name="特殊顾客" display-directive="show">
          <CustomerSpecial />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.character-page {
  display: flex;
  padding: 12px;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>