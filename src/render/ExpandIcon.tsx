import { NIcon } from 'naive-ui'

import { UpSquareFilled, DownSquareFilled } from '@vicons/antd'

export const renderExpandIcon = ({ expanded }: {
  expanded: boolean,
}) => {
  return <NIcon
    size={16}
    depth={1}
    color={'#18a058'}
    style={{
      transform: 'rotate(0deg) scale(1.5)'
    }}
  >
    { expanded ? <UpSquareFilled /> : <DownSquareFilled /> }
  </NIcon>
}