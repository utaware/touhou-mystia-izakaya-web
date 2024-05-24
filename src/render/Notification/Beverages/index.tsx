import { NSpace } from 'naive-ui'

import type { TBeverageItem } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import { renderNotificationTitle } from '@/render/Notification/CommonTitle'

export function createNotification (item: TBeverageItem) {
  const { beverage_tags, from, price, level } = item
  return {
    title: renderNotificationTitle(item, { type: 'beverages' }),
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
          { beverage_tags.map((item) => <TagItem category="beverage" value={item} />) }
        </NSpace>
      )
    },
  }
}