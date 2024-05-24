import { NSpace } from 'naive-ui'

import type { TIngredientsItem } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import { renderNotificationTitle } from '@/render/Notification/CommonTitle'

export function createNotification (item: TIngredientsItem) {
  const { ingredient_tags, from, price, level } = item
  return {
    title: renderNotificationTitle(item, { type: 'ingredients' }),
    description: () => {
      return (
        <NSpace>
          <span>售价 : ${price}</span>
          <span>等级 : Lv.{level}</span>
        </NSpace>
      )
    },
    meta: () => {
      return <NSpace vertical>
        { from.map(v => v) }
      </NSpace>
    },
    content: () => {
      return (
        <NSpace>
          { ingredient_tags.length
            ? ingredient_tags.map((item) => <TagItem category="like" value={item} />)
            : <TagItem category="like" value="-" />
          }
        </NSpace>
      )
    },
  }
}