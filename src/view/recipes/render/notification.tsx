import { NSpace, NDivider } from 'naive-ui'

import type { TRecipeItem, TCustomerTagType } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

function renderTags (tags: string[], category: TCustomerTagType) {
  return (
    <>
      { tags.map((item) => <TagItem category={category} value={item} />) }
    </>
  )
}

function renderIngredients (ingredients: string[]) {
  return (
    <NSpace>
      { ingredients.map((name) => <SpriteItem type="ingredients" name={name} size={28} />) }
    </NSpace>
  )
}

export function createNotification (item: TRecipeItem) {
  const { index, name, level, tool, from, positive_tags, negative_tags, ingredients } = item
  return {
    title: () => {
      return (
        <NSpace align="center">
          <SpriteItem index={index} size={28} title={name} type="recipes" />
          <div class="bold">{ name }【Lv.{ level }】</div>
        </NSpace>
      )
    },
    description: () => {
      return <NSpace align="center">
        <SpriteItem name={tool} size={28} title={tool} type="tools" />
        <NDivider vertical />
        { renderIngredients(ingredients) }
      </NSpace>
    },
    meta: () => {
      return <>
        获取来源 : { from }
      </>
    },
    content: () => {
      return (
        <NSpace>
          { renderTags(positive_tags, 'like') }
          { renderTags(negative_tags, 'hate') }
        </NSpace>
      )
    },
  }
}