<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore } from '@/pinia'

import SpriteUnknow from '@/components/common/sprite/unknow.vue'
import SpriteItem from '@/components/common/sprite/index.vue'

const recipesStore = useRecipesStore()

const { currentRecipe } = storeToRefs(recipesStore)

</script>

<template>
  <n-card class="edit-panel">
    <div class="config">
      <sprite-item
        v-if="currentRecipe"
        catogory="recipe"
        :index="currentRecipe.index"
        :title="currentRecipe.name"
        :size="64"
      />
      <sprite-unknow
        v-else
        :size="64"
      />
    </div>
  </n-card>
</template>

<style scoped lang="scss">

</style>