<script setup lang="ts">
import SpriteUnknow from '@/components/common/sprite/unknow.vue'
import SpriteItem from '@/components/common/sprite/index.vue'

import type { TSpriteType } from '@/utils/tag'

interface CurrentItem {
  name: string;
  index: number;
}

interface Propstype {
  size?: number;
  type: TSpriteType;
  item: null | CurrentItem;
}

defineProps<Propstype>()
</script>

<template>
  <sprite-item
    v-if="item"
    :type="type"
    :index="item.index"
    :title="item.name"
    :size="size"
  />
  <sprite-unknow
    v-else
    :size="size"
  />
</template>

<style scoped lang="scss">
</style>