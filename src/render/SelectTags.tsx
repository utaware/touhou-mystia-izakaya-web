import type { SelectRenderTag } from 'naive-ui'

import TagItem from '@/components/common/tags/index.vue'

import type { TCustomerTagType } from '@/material'

export const renderSelectTags = ({
  category,
}: {
  category: TCustomerTagType,
}): SelectRenderTag => {
  return ({ option, handleClose }) => {
    const { label } = option
    return (
      <TagItem
        {...{
          category,
          closable: true,
          onClose: (e: MouseEvent) => {
            e.stopPropagation()
            handleClose()
          }
        }}
      >
        { label }
      </TagItem>
    )
  }
}