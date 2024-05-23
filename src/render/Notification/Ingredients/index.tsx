import { NSpace } from 'naive-ui'

import type { TIngredientsItem } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import { renderNotificationTitle } from '@/render/Notification/CommonTitle'

export function createNotification (item: TIngredientsItem) {
  const { ingredient_tags, from } = item
  const [ gather, buy ] = from
  return {
    title: renderNotificationTitle(item, { type: 'ingredients' }),
    meta: () => {
      return <NSpace vertical>
        <>{ gather }</>
        <>{ buy }</>
      </NSpace>
    },
    content: () => {
      return (
        <NSpace>
          { ingredient_tags.map((item) => <TagItem category="like" value={item} />) }
        </NSpace>
      )
    },
  }
}