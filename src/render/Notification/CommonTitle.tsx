import { NSpace } from 'naive-ui'

import { getPublicAssets, type TPublicDirName } from '@/utils/pub-use'

interface TRenderItem {
  index: number,
  name: string,
  level: number,
  dlc: string,
}

interface TRenderOption {
  size?: number;
  type: TPublicDirName
}

export function renderNotificationTitle(item: TRenderItem, options: TRenderOption) {
  const { name, dlc } = item
  const { size = 28, type } = options
  return () => (
    <NSpace align="center">
      <img width={size} src={getPublicAssets(type, name)} alt={name} title={name} />
      <div class="bold">【{dlc}】{ name }</div>
    </NSpace>
  )
}