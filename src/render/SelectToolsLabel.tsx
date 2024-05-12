import { NSpace } from 'naive-ui'
import type { SelectRenderLabel } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'

export const renderSelectToolsLabel: SelectRenderLabel = (option) => {
  const text = String(option.label)
  return (
    <NSpace>
      <SpriteItem
        size={24}
        type="tools"
        name={text}
      />
      { text }
    </NSpace>
  )
}