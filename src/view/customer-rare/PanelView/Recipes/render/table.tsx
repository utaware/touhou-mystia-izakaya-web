import { NTag, NSpace, NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import type { TRecipeMatchItem } from '@/material'

import { getCustomerTagType } from '@/utils/customer'

export const createColumns = ({
  handleSelectRow,
  spriteSize = 32,
}: {
  handleSelectRow: (item: TRecipeMatchItem) => void,
  spriteSize?: number,
}): DataTableColumns<TRecipeMatchItem> => {
  return [
    {
      type: 'expand',
      renderExpand ({ positive_tags, match_like_tags, match_hate_tags }: TRecipeMatchItem) {
        const customer = {
          like_tags: match_like_tags,
          hate_tags: match_hate_tags,
          beverage_tags: [],
        }
        return (
          <NSpace justify="center">
          { positive_tags.map((item) => <TagItem category={getCustomerTagType(item, customer)} value={item} />) }
          </NSpace>
        )
      }
    },
    {
      title: '名称',
      key: 'name',
      className: 'bold'
    },
    {
      title: '料理',
      key: 'recipes',
      render ({ index }) {
        return <SpriteItem
          index={index}
          size={spriteSize}
          type="recipes"
        />
      }
    },
    {
      title: '厨具',
      key: 'tool',
      render ({ tool }) {
        return <SpriteItem
          name={tool}
          size={spriteSize}
          title={tool}
          type="tools"
        />
      },
    },
    {
      title: '食材',
      key: 'ingredients',
      render ({ ingredients }) {
        return (
          <>
          {
            ingredients.map((ingredient) => (
              <SpriteItem
                name={ingredient}
                size={spriteSize}
                title={ingredient}
                type="ingredients"
              />)
            )
          }
          </>
        )
      }
    },
    {
      title: '价格(円)',
      sorter: 'default',
      key: 'price',
      render ({ price }) {
        return <NTag type="warning" class="bold">${ price }</NTag>
      },
    },
    {
      title: '匹配度',
      key: 'match_recipe_point',
      className: 'sort-columns',
      sorter: 'default',
      render ({ badge_text }) {
        return <NTag type="error">{ badge_text }</NTag>
      },
    },
    {
      title: '操作',
      key: 'handle',
      titleAlign: 'center',
      width: 60,
      render (item) {
        return (
          <NButton type="success" quaternary onClick={() => handleSelectRow(item)}>选择</NButton>
        )
      }
    }
  ]
}

export const pagination = { pageSize: 12 }

export const getRowKey = ({ name }: TRecipeMatchItem) => name