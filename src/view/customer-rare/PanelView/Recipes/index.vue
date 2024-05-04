<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

import { useRecipesStore, type TRecipeItem } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

import recipesDetail from './detail.vue'

const recipesStore = useRecipesStore()

const {
  negativeTagOptions,
  positiveTagOptions,
  getRecipesWithCustomerRare: recipes,
} = storeToRefs(recipesStore)

const selectedPositiveTags = ref([])
const selectedNegativeTags = ref([])

const detailModalShow = ref(false)

const handleClickItem = (item: TRecipeItem) => {
  recipesStore.setCurrentRecipe(item)
  detailModalShow.value = true
}
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <div class="config">
      <n-select v-model:value="selectedPositiveTags" multiple :options="positiveTagOptions" />
      <n-select v-model:value="selectedNegativeTags" multiple :options="negativeTagOptions" />
    </div>
    <!-- view -->
    <ul class="recipes-view">
      <li
        class="item"
        v-for="(item, index) in recipes"
        :key="index"
      >
        <n-badge
          :value="item.badge_text"
          show-zero
          type="error"
        >
          <sprite-item
            :index="item.index"
            :width="48"
            :height="48"
            :title="item.name"
            type="recipes"
            @click="handleClickItem(item)"
          />
        </n-badge>
      </li>
    </ul>
    <!-- modal -->
    <n-modal v-model:show="detailModalShow">
      <recipes-detail />
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .config {
    display: flex;
    justify-content: space-between;
  }
  .recipes-view {
    margin-top: 24px;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, 64px);
    justify-content: space-between;
  }
}
</style>