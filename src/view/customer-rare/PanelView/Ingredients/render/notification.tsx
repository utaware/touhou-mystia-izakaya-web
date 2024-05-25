import type { Component } from 'vue'

import { NSpace, NIcon, NButton } from 'naive-ui'

import { PlusSquareFilled, MinusSquareFilled, CheckSquareFilled } from '@vicons/antd'

import type { TCustomerRare, TMatchIngredientsItem, TCustomerTagType } from '@/material'

import TagItem from '@/components/common/tags/index.vue'

import '../style/notification.scss'
import color from '@/styles/color.module.scss'

import { getCustomerTagType } from '@/utils/customer'

import { getPublicAssets } from '@/utils/pub-use'

type TTagTypeFn = (tag: string) => TCustomerTagType

export function iconRender (icon: Component) {
  return (
    <NIcon size={24} depth={1} color={color.primary} component={icon}/>
  )
}

export function tagsRender (tags: string[], getTagType: TTagTypeFn) {
  return (
    <NSpace>
      {
        tags.length
          ? tags.map((item) => <TagItem category={getTagType(item)} value={item} />)
          : <TagItem category="default" value="-" />
      }
    </NSpace>
  )
}

export function formItemRender ({
  tags, icon, label, getTagType
}: {
  tags: string[],
  icon: Component,
  label: string,
  getTagType: TTagTypeFn
}) {
  return (
    <div class="form-item">
      <div class="form-item-header">
        <span class="icon">{ iconRender(icon) }</span>
        <span class="bold">{ label }</span>
      </div>
      <div class="form-item-content">
        { tagsRender(tags, getTagType) }
      </div>
    </div>
  )
}

export function createNotification ({
  item, customer, handleActionClick,
}: {
  item: TMatchIngredientsItem,
  customer: TCustomerRare,
  handleActionClick(name: string): void
}) {
  const { name, add_tags, remove_tags, fix_tags, type } = item
  const getTagType = (tag: string) => getCustomerTagType(tag, customer)
  const options = [
    { tags: fix_tags, icon: CheckSquareFilled, label: '保留', },
    { tags: add_tags, icon: PlusSquareFilled, label: '添加', },
    { tags: remove_tags, icon: MinusSquareFilled, label: '覆盖', },
  ]
  return {
    title: () => {
      return (
        <div class="title">
          <img width="28" src={getPublicAssets('ingredients', name)} alt={name} title={name} />
          <div style="margin-left: 12px;" class="bold">{ name }</div>
        </div>
      )
    },
    description: `继续选择${name}后菜谱 tag 改变情况 : `,
    meta: `食材类别 : ${type}`,
    content: () => {
      return (
        <NSpace vertical>
          { options.map(({ tags, icon, label }) => formItemRender({ tags, icon, label, getTagType }) ) }
        </NSpace>
      )
    },
    action: () => {
      return (
        <NButton type="info" dashed size="small" onClick={() => handleActionClick(name)}>添加</NButton>
      )
    }
  }
}