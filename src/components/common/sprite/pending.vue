<script setup lang="ts">
import SpriteUnknow from '@/components/common/sprite/unknow.vue'

import type { TSpriteType } from '@/material'

import { getPublicAssets } from '@/utils/pub-use'

interface Propstype {
  size?: number;
  type: TSpriteType;
  name: undefined | string;
}

defineProps<Propstype>()
</script>

<template>
  <img
    v-if="name"
    :width="size"
    :src="getPublicAssets(type, name)"
    :alt="name"
    :title="name"
  />
  <sprite-unknow
    v-else
    :size="size"
  />
</template>

<style scoped lang="scss">
</style>