<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRecipesStore, type TRecipeItem } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

const recipesStore = useRecipesStore()

const { currentRecipe } = storeToRefs(recipesStore)
</script>

<template>
  <!-- wrapper -->
  <div class="modal-content">
    <!-- card -->
    <n-card
      style="width: 600px"
      :bordered="false"
      :title="currentRecipe.name"
      :segmented="false"
      size="huge"
    >
      <template #header-extra>
        <sprite-item
          :index="1"
          :width="48"
          :height="48"
          type="tools"
        />
      </template>
      <div class="container">
        <!-- right -->
      </div>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
</style>