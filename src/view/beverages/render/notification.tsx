import { NSpace } from 'naive-ui'

import type { TBeverageItem } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import { renderNotificationTitle } from '@/render/Notification/CommonTitle'

export function createNotification (item: TBeverageItem) {
  const { beverage_tags, price, dlc } = item
  return {
    title: renderNotificationTitle(item, { type: 'beverages' }),
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