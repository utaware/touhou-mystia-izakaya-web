import { NTag, NSpace, NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import SpriteItem from '@/components/common/sprite/index.vue'
import TagItem from '@/components/common/tags/index.vue'

import { beverageLevelOptions } from '@/material/options'

import type { TBeverageMatchItem } from '@/material'

export const createColumns = ({
  handleSelectRow,
  spriteSize = 32,
}: {
  handleSelectRow: (name: string) => void,
  spriteSize?: number,
}): DataTableColumns<TBeverageMatchItem> => {
  return [
    {
      type: 'expand',
      renderExpand ({ match_beverage_tags, beverage_tags }: TBeverageMatchItem) {
        return (
          <NSpace justify="center">
          {
            beverage_tags.map((item) => {
              return (<TagItem
                active={match_beverage_tags.includes(item)}
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
      title: '名称',
      key: 'name',
      className: 'bold'
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
      title: '等级',
      key: 'level',
      className: 'bold',
      filter: (value, row) => row.level === value,
      filterOptions: beverageLevelOptions,
      defaultFilterOptionValues: null,
      render ({ level }) {
        return <NTag type="info">Lv.{ level }</NTag>
      },
    },
    {
      title: '价格(円)',
      key: 'price',
      sorter: 'default',
      render ({ price }) {
        return <NTag type="warning" class="bold">${ price }</NTag>
      },
    },
    {
      title: '匹配度',
      key: 'match_beverage_point',
      sorter: 'default',
      className: 'sort-columns',
      render ({ badge_text }) {
        return <NTag type="error">{ badge_text }</NTag>
      },
    },
    {
      title: '操作',
      key: 'handle',
      titleAlign: 'center',
      width: 60,
      render ({ name }) {
        return (
          <NButton type="success" quaternary onClick={() => handleSelectRow(name)}>选择</NButton>
        )
      }
    }
  ]
}

export const pagination = { pageSize: 12 }

export const getRowKey = ({ name }: TBeverageMatchItem) => name