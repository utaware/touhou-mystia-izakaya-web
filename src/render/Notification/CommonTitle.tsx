import { NSpace } from 'naive-ui'

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
  const { name, dlc } = item
  const { size = 28, type } = options
  return () => (
    <NSpace align="center">
      <img width={size} src={`/public/${type}/${name}.png`} alt={name} title={name} />
      <div class="bold">【{dlc}】{ name }</div>
    </NSpace>
  )
}