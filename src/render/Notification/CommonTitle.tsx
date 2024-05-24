import { NSpace } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'

import type { TSpriteType } from '@/material'

interface TRenderItem {
  index: number,
  name: string,
  level: number,
  dlc: string,
}

interface TRenderOption {
  size?: number;
  type: TSpriteType
}

export function renderNotificationTitle(item: TRenderItem, options: TRenderOption) {
  const { index, name, dlc } = item
  const { size = 28, type } = options
  return () => (
    <NSpace align="center">
      <SpriteItem index={index} size={size} title={name} type={type} />
      <div class="bold">【{dlc}】{ name }</div>
    </NSpace>
  )
}