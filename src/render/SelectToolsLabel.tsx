import { NSpace } from 'naive-ui'
import type { SelectRenderLabel } from 'naive-ui'

import { getPublicAssets } from '@/utils/pub-use'

export const renderSelectToolsLabel: SelectRenderLabel = (option) => {
  const text = String(option.label)
  return (
    <NSpace align="center">
      <img
        width="24"
        src={getPublicAssets('tools', text)}
        alt={text}
        title={text}
      />
      { text }
    </NSpace>
  )
}