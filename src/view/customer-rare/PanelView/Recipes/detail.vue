<script setup lang="ts">
import { storeToRefs } from 'pinia'

import {
  useRecipesStore,
  useCustomerRareStore,
  useIngredientsStore
} from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

const recipesStore = useRecipesStore()
const customerStore = useCustomerRareStore()
const ingredientsStore = useIngredientsStore()

const { getIngredientIndex } = ingredientsStore

const { currentCustomer } = storeToRefs(customerStore)

const { currentRecipe, currentToolIndex } = storeToRefs(recipesStore)

const { like_tags, hate_tags } = currentCustomer.value
const customerTags = [...like_tags, ...hate_tags]

const isNoMatchTag = (item: string): boolean => {
  return !customerTags.includes(item)
}

const getTagType = (item: string): 'like' | 'hate' => {
  return hate_tags.includes(item) ? 'hate' : 'like'
}
</script>

<template>
  <!-- wrapper -->
  <n-modal>
    <!-- card -->
    <n-card
      style="width: 600px"
      :bordered="false"
      :title="currentRecipe.name"
      :segmented="false"
      size="huge"
    >
      <!-- header-extra -->
      <template #header-extra>
        <sprite-item
          :index="currentToolIndex"
          :title="currentRecipe.tool"
          :width="32"
          :height="32"
          type="tools"
        />
      </template>
      <!-- default -->
      <div class="container">
        <!-- positive_tags -->
        <n-space>
          <tag-item
            :disabled="isNoMatchTag(item)"
            :category="getTagType(item)"
            :value="item"
            v-for="item in currentRecipe.positive_tags"
            :key="item"
          />
        </n-space>
      </div>
      <!-- action -->
      <template #footer>
        <!-- ingredients -->
        <n-space class="ingredients">
          <sprite-item
            v-for="(item) in currentRecipe.ingredients"
            :index="getIngredientIndex(item)"
            :width="32"
            :height="32"
            :title="item"
            type="ingredients"
          />
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  row-gap: 20px;
}
</style>