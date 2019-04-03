
// import { parseTime, parseType } from 'lib'

/** 客户列表 */
export const tagsColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '别名',
    dataIndex: 'alias',
  },
  {
    title: '颜色',
    dataIndex: 'color',
  },
  {
    title: '数量',
    dataIndex: 'num',
  }
]
tagsColumns.key = 'index'

// render: (time) => parseTime(time, '{y}-{m}-{d}')
// render: (type) => parseType('opStatus', type)