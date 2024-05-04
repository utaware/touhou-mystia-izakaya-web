import { NIcon } from 'naive-ui'

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  SmallDashOutlined
} from '@vicons/antd'

import type { DataTableSortState } from 'naive-ui'

type TSortOrderValue = DataTableSortState['order']

const getSortIcon = (order: TSortOrderValue) => {
  switch (order) {
    case 'ascend':
      return SortDescendingOutlined
    case 'descend':
      return SortAscendingOutlined
    default:
      return SmallDashOutlined
  }
}

export const renderSorterIcon = ({ order }: { order: TSortOrderValue }) => {
  return <NIcon size={24} component={getSortIcon(order)} />
}