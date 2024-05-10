<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- content -->
    <slot></slot>
    <!-- modal -->
    <div class="modal">
      <div class="inset">
        <slot name="modal"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  .modal {
    position: absolute;
    display: none;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-modal);
    border-radius: 4px;
    .inset {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
  &:hover {
    .modal {
      display: block;
    }
  }
}
</style>