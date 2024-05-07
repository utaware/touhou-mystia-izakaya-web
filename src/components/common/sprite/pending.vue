<script setup lang="ts">
import SpriteUnknow from '@/components/common/sprite/unknow.vue'
import SpriteItem from '@/components/common/sprite/index.vue'

import type { TSpriteType } from '@/material'

interface Propstype {
  size?: number;
  type: TSpriteType;
  name: undefined | string;
}

defineProps<Propstype>()
</script>

<template>
  <sprite-item
    v-if="name"
    :type="type"
    :name="name"
    :title="name"
    :size="size"
  />
  <sprite-unknow
    v-else
    :size="size"
  />
</template>

<style scoped lang="scss">
</style>