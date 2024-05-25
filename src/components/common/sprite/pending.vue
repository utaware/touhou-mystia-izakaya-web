<script setup lang="ts">
import SpriteUnknow from '@/components/common/sprite/unknow.vue'

import { getPublicAssets, type TPublicDirName } from '@/utils/pub-use'

interface Propstype {
  size?: number;
  type: TPublicDirName;
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