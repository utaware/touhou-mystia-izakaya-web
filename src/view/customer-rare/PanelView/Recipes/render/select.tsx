import { NSpace } from 'naive-ui'
import type { SelectRenderTag, SelectRenderLabel } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

export const renderToolsLabel: SelectRenderLabel = (option) => {
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

export const renderSelectTags = (
  { category }: { category: 'like' | 'hate' | 'beverage' }
): SelectRenderTag => {
  return ({ option, handleClose }) => {
    const { label } = option
    return (
      <TagItem
        category={category}
        value={String(label)}
        closable={true}
        onClose={ (e: MouseEvent) => {
          e.stopPropagation()
          handleClose()
        }}
      />
    )
  }
}