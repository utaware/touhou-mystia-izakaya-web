import { NBadge, NButton, NIcon } from 'naive-ui'
import type { DataTableColumns, DataTableSortState } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  SmallDashOutlined
} from '@vicons/antd'

import { type TRecipeMatchItem } from '@/pinia'

const renderSorterIcon = (order: DataTableSortState['order']) => {
  switch (order) {
    case 'ascend':
      return SortDescendingOutlined
    case 'descend':
      return SortAscendingOutlined
    default:
      return SmallDashOutlined
  }
}

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
      title: '匹配数',
      key: 'match_recipe_point',
      sorter: 'default',
      render ({ badge_text }) {
        return  <NBadge
          value={badge_text}
          show-zero
          type="error"
        />
      },
      renderSorterIcon: ({ order }) => <NIcon size={24} component={renderSorterIcon(order)} />
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
    {
      title: '操作',
      key: 'handle',
      render: () => (
        <NButton strong tertiary size="small">
          详情
        </NButton>
      )
    },
  ]
}

export const pagination = { pageSize: 12 }

export const getRowKey = ({ name }: TRecipeMatchItem) => name