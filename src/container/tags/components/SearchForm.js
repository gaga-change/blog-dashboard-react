import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, Card } from 'antd'

/**
 * props: 
 *  onSubmit(return Promise)  
 */
class SearchForm extends Component {

  state = {
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        this.props.onSubmit(values).then(() => {
          this.setState({ loading: false })
        })
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form;

    return (
      <Card >
        <Form onSubmit={this.handleSubmit} className="search-form">
          <Row gutter={24}>
            <Col span={6} >
              <Form.Item label={'名称'}>
                {getFieldDecorator('name', {
                  rules: [],
                })(
                  <Input placeholder="" maxLength={120} />
                )}
              </Form.Item>
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" icon="search" loading={loading}>搜索</Button>
              <Button type="dashed" style={{ marginLeft: 8 }} onClick={this.handleReset}>清除</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.props.onAdd}>添加</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default Form.create({ name: 'customer_search' })(SearchForm)
