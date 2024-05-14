import { NSpace } from 'naive-ui'

import type { TBeverageItem } from '@/material'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

export function createNotification (item: TBeverageItem) {
  const { index, name, beverage_tags, level, price, dlc } = item
  return {
    title: () => {
      return (
        <div class="title">
          <SpriteItem index={index} size={28} title={name} type="beverages" />
          <div class="bold">{ name }【Lv.{ level }】</div>
        </div>
      )
    },
    description: () => {
      return <NSpace class="description">
        <span class="price">售价 : ${price}</span>
      </NSpace>
    },
    meta: dlc,
    content: () => {
      return (
        <NSpace>
          { beverage_tags.map((item) => <TagItem category="beverage" value={item} />) }
        </NSpace>
      )
    },
  }
}