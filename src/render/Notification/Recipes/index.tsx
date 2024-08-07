import { NSpace, NDivider } from 'naive-ui'

import type { TRecipeItem, TCustomerTagType } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import { renderNotificationTitle } from '@/render/Notification/CommonTitle'

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
  const { tool, from, positive_tags, negative_tags, ingredients, price, level } = item
  return {
    title: renderNotificationTitle(item, { type: 'recipes' }),
    description: () => {
      return (
        <NSpace vertical>
          <NSpace align="center">
            <SpriteItem name={tool} size={28} title={tool} type="tools" />
            <NDivider vertical />
            { renderIngredients(ingredients) }
          </NSpace>
          <NSpace>
            <span>售价 : ${price}</span>
            <span>等级 : Lv.{level}</span>
          </NSpace>
        </NSpace>
      )
    },
    meta: () => {
      return <NSpace vertical>
        <span class="from">获取来源 : { from }</span>
      </NSpace>
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