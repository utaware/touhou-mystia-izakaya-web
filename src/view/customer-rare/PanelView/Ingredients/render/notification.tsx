import type { Component } from 'vue'

import { NSpace, NIcon, NButton } from 'naive-ui'

import { PlusSquareFilled, MinusSquareFilled, CheckSquareFilled } from '@vicons/antd'

import type { TMatchIngredientsItem } from '@/utils/ingredients'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import '../style/notification.scss'
import color from '@/styles/color.module.scss'

export function iconRender (icon: Component) {
  return (
    <NIcon size={24} depth={1} color={color.primary} component={icon}/>
  )
}

export function tagsRender (tags: string[]) {
  return (
    <NSpace>
      {
        tags.length
          ? tags.map((item) => <TagItem category='like' value={item} />)
          : <TagItem category='like' value="-" />
      }
    </NSpace>
  )
}

export function formItemRender (tags: string[], icon: Component, text: string) {
  return (
    <div class="form-item">
      <div class="form-item-header">
        <span class="icon">{ iconRender(icon) }</span>
        <span class="bold">{ text }</span>
      </div>
      <div class="form-item-content">
        { tagsRender(tags) }
      </div>
    </div>
  )
}

export function createNotification (item: TMatchIngredientsItem) {
  const { index, name, add_tags, remove_tags, fix_tags } = item
  const options = [
    { tag: fix_tags, icon: CheckSquareFilled, label: '保留', },
    { tag: add_tags, icon: PlusSquareFilled, label: '添加', },
    { tag: remove_tags, icon: MinusSquareFilled, label: '覆盖', },
  ]
  return {
    title: () => {
      return (
        <div class="title">
          <SpriteItem index={index} size={28} title={name} type="ingredients" />
          <div style="margin-left: 12px;" class="bold">{ name }</div>
        </div>
      )
    },
    description: `继续选择${name}后菜谱 tag 改变情况 : `,
    content: () => {
      return (
        <NSpace vertical>
          { options.map(({ tag, icon, label }) => formItemRender(tag, icon, label) ) }
        </NSpace>
      )
    },
    action: () => {
      return (
        <NButton text type="primary" onClick={() => {}}>确定</NButton>
      )
    }
  }
}