import { NBadge, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import type { TRecipeMatchItem } from '@/pinia'

import { renderSorterIcon } from './sortMatchPoint.tsx'

export const createColumns = ({
  getIngredientIndex,
  getToolIndex,
  spriteSize = 28,
}: {
  getIngredientIndex: (item: string) => number,
  getToolIndex: (name: string) => number,
  spriteSize?: number,
}): DataTableColumns<TRecipeMatchItem> => {
  return [
    {
      type: 'expand',
      renderExpand ({ positive_tags, like_match_tags, hate_match_tags }: TRecipeMatchItem) {
        const match_tags = [like_match_tags, hate_match_tags].flat()
        const isNoMatchTag = (item: string): boolean => !match_tags.includes(item)
        const isHateTag = (item: string): boolean => hate_match_tags.includes(item)
        return (
          <NSpace>
          {
            positive_tags.map((item) => {
              return (<TagItem
                disabled={isNoMatchTag(item)}
                category={isHateTag(item) ? 'hate' : 'like'}
                value={item}
              />)
            })
          }
          </NSpace>
        )
      }
    },
    {
      title: '匹配数',
      key: 'match_recipe_point',
      sorter: 'default',
      className: 'sort-columns',
      defaultSortOrder: 'descend',
      render ({ badge_text }) {
        return  <NBadge
          value={badge_text}
          show-zero
          type="error"
        />
      },
      renderSorterIcon
    },
    {
      title: '料理',
      key: 'recipes',
      render ({ index }) {
        return <SpriteItem
          index={index}
          width={spriteSize}
          height={spriteSize}
          type="recipes"
        />
      }
    },
    {
      title: '名称',
      key: 'name',
      className: 'bold'
    },
    {
      title: '厨具',
      key: 'tool',
      render ({ tool }) {
        return <SpriteItem
          index={getToolIndex(tool)}
          width={spriteSize}
          height={spriteSize}
          title={tool}
          type="tools"
        />
      },
      filter (value, row) {
        return value === row.tool
      }
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
                index={getIngredientIndex(ingredient)}
                width={spriteSize}
                height={spriteSize}
                title={ingredient}
                type="ingredients"
              />)
            )
          }
          </>
        )
      }
    },
  ]
}

export const pagination = { pageSize: 12 }

export const getRowKey = ({ name }: TRecipeMatchItem) => name