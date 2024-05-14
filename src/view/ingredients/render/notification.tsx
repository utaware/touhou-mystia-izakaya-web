import { NSpace } from 'naive-ui'

import type { TIngredientsItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

export function createNotification (item: TIngredientsItem) {
  const { index, name, ingredient_tags, dlc, from } = item
  const [ gather, buy ] = from
  return {
    title: () => {
      return (
        <NSpace class="title">
          <SpriteItem index={index} size={28} title={name} type="ingredients" />
          <div class="bold">{ name }</div>
        </NSpace>
      )
    },
    description: dlc,
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