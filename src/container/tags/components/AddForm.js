import React, { Component } from 'react'
import { Form, Input } from 'antd'
/**
 * props:
 *  bindRef 绑定child
 * child:
 *  submit  提交
 *  rest 重置
 */
class AddForm extends Component {
  state = {

  }

  componentDidMount() {
    this.props.bindRef(this)
  }

  submit = (cb) => {
    this.props.form.validateFieldsAndScroll(cb)
  }

  rest = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { record } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
      },
    }

    return (
      <Form {...formItemLayout}>
        <Form.Item
          label="名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入名称！'
            }],
            initialValue: record.name
          })(
            <Input maxLength={50} />
          )}
        </Form.Item>
        <Form.Item
          label="别名"
        >
          {getFieldDecorator('alias', {
            rules: [{
              required: true, message: '请输入别名！'
            }], initialValue: record.alias
          })(
            <Input maxLength={50} />
          )}
        </Form.Item>
        <Form.Item
          label="颜色"
        >
          {getFieldDecorator('color', {
            rules: [], initialValue: record.color
          })(
            <Input maxLength={50} />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'customer_add' })(AddForm)