import { NBadge, NTag, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import type { TBeverageMatchItem } from '@/pinia'

export const createColumns = ({
  spriteSize = 28,
}: {
  spriteSize?: number,
}): DataTableColumns<TBeverageMatchItem> => {
  return [
    {
      type: 'expand',
      renderExpand ({ match_tags, beverage_tags }: TBeverageMatchItem) {
        return (
          <NSpace>
          {
            beverage_tags.map((item) => {
              return (<TagItem
                disabled={!match_tags.includes(item)}
                category="beverage"
                value={item}
              />)
            })
          }
          </NSpace>
        )
      }
    },
    {
      title: '匹配度',
      key: 'match_recipe_point',
      className: 'sort-columns',
      render ({ badge_text }) {
        return  <NBadge
          value={badge_text}
          show-zero
          type="error"
        />
      },
    },
    {
      title: '酒水',
      key: 'recipes',
      render ({ index }) {
        return <SpriteItem
          index={index}
          width={spriteSize}
          height={spriteSize}
          type="beverages"
        />
      }
    },
    {
      title: '名称',
      key: 'name',
      className: 'bold'
    },
    {
      title: '价格(円)',
      key: 'price',
      render ({ price }) {
        return <NTag type="warning" class="bold">{ price }</NTag>
      }
    },
    {
      title: '等级',
      key: 'level',
      className: 'bold',
      render ({ level }) {
        return <NTag type="info">Lv.{ level }</NTag>
      }
    },
  ]
}

export const pagination = { pageSize: 12 }

export const getRowKey = ({ name }: TBeverageMatchItem) => name