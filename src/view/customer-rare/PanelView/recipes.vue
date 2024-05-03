<script setup lang="ts">
import { computed } from 'vue'

import { useRecipesStore, TCustomerRare } from '@/pinia'

import SpriteItem from '@/components/common/sprite/index.vue'

import { orderBy } from 'lodash'

import { getMatchResult } from '@/utils'

const recipesStore = useRecipesStore()

const props = defineProps<{
  customer: TCustomerRare
}>()

const recipes = computed(() => {
  return orderBy(recipesStore.recipes.map((item) => {
    const { like_tags, hate_tags } = props.customer
    const { positive_tags } = item
    const { isMatch: like_match_tags } = getMatchResult(like_tags, positive_tags)
    const { isMatch: hate_match_tags } = getMatchResult(hate_tags, positive_tags)
    const value = like_match_tags.length - hate_match_tags.length
    const text = String(value)
    return { ...item, like_match_tags, hate_match_tags, value, text }
  }), ['value'], ['desc'])
})

console.log(recipes)
</script>

<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- config -->
    <!-- view -->
    <ul class="recipes-list">
      <li
        class="item"
        v-for="(item, index) in recipes"
        :key="index"
      >
        <n-badge
          :value="item.text"
          show-zero
          type="error"
        >
          <sprite-item
            :index="item.index"
            :width="64"
            :height="64"
            :title="item.name"
            type="recipes"
          />
        </n-badge>
        <!-- <span>{{ item.name }}</span> -->
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.recipes-list {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, 64px);
  justify-content: space-between;
}
</style>