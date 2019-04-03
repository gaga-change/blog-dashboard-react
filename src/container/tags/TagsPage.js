import React, { Component } from 'react'
import './TagsPage.scss'
import { Table, Modal } from 'antd'
import { tagsColumns } from 'config/table'
import { tags } from 'api'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'
const DEFAULT_PAGE_SIZE = 10
class TagsPage extends Component {
  state = {
    dataSource: [],
    tableLoading: false,
    pageInfo: {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    },
    totalElements: 0,
    isModify: false,
    visible: false,
    confirmLoading: false,
    record: {}
  }

  componentDidMount() {
    this.initData(this.state.pageInfo)
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  initData(pageInfo, search) {
    this.setState({ tableLoading: true })
    return tags.getList({ ...pageInfo, ...search }).then(res => {
      this.setState({
        tableLoading: false,
        dataSource: res.data.map((v, i) => { v.index = i; return v }),
        totalElements: res.page.totalElements
      })
    })
  }

  handleChangePage = (page, pageSize) => {
    const { pageInfo } = this.state
    let newPageInfo = {
      ...pageInfo,
      page,
      pageSize
    }
    this.setState({
      pageInfo: newPageInfo
    })
    this.initData(newPageInfo)
  }

  handleSearch = (values) => {
    const { pageInfo } = this.state
    let newPageInfo = { ...pageInfo, page: 0 }
    this.setState({
      pageInfo: newPageInfo
    })
    return this.initData(newPageInfo, values)
  }

  // 显示新增表单按钮
  handleAdd = () => {
    this.setState({ visible: true, isModify: false, record: {} })
  }

  /**
 * 弹框确认按钮
 */
  handleOk = () => {
    this.addForm.submit((err, values) => {
      if (err) return
      this.setState({ confirmLoading: true })
      const close = () => {
        this.setState({ confirmLoading: false })
        this.handleCancel()
        // this.getAddressList()
      }
      if (this.state.isModify) {
        // 修改
        // api({ ...this.state.record, ...values }).then(close)
      } else {
        // 增加
        tags.post(values).then(close)
      }
    })
  }

  /**
   * 弹框取消
   */
  handleCancel = () => {
    this.setState({ visible: false })
    this.addForm.rest()
  }

  bindRef = ref => this.addForm = ref

  render() {
    const { dataSource, pageInfo, tableLoading, visible, confirmLoading, isModify, record, totalElements } = this.state
    return (
      <div>
        <SearchForm onSubmit={this.handleSearch} onAdd={this.handleAdd}></SearchForm>
        <Modal
          title={isModify ? "修改" : "添加收货地址"}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <AddForm record={record} bindRef={this.bindRef} />
        </Modal>
        <Table
          className="mt20"
          rowKey={tagsColumns.key}
          dataSource={dataSource}
          columns={tagsColumns}
          loading={tableLoading}
          pagination={
            {
              size: 'small',
              showSizeChanger: true,
              showQuickJumper: true,
              ...pageInfo,
              total: totalElements,
              onChange: this.handleChangePage,
              onShowSizeChange: this.handleChangePage
            }
          } />
      </div>
    )
  }
}

export default TagsPage