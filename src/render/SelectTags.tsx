import type { SelectRenderTag } from 'naive-ui'

import TagItem from '@/components/common/tags/index.vue'

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