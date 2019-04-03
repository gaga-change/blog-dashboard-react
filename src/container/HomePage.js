import React, { Component } from 'react'
import './HomePage.scss'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd'
import { getRouter, route } from 'router'
import menu from 'config/menu'
const {
  Header, Content, Footer, Sider,
} = Layout
const SubMenu = Menu.SubMenu
// 默认子路由
let defaultRouteName = null
// 默认展开全部
const defaultOpenKeys = []
menu.forEach((item, index) => {
  if (item.defalut) defaultRouteName = item.routeName
  item.children && defaultOpenKeys.push(index + '')
})
class HomePage extends Component {
  state = {
    collapsed: false,
    breadcrumb: {}
  }

  componentDidMount() {
    let breadcrumb = {}
    _parse(null, menu)
    function _parse(fa, arr) {
      arr.forEach(item => {
        let temp = breadcrumb[route[item.routeName]] = []
        if (item.children) _parse(item, item.children)
        else {
          fa && temp.push(fa.name)
          temp.push(item.name)
        }
      })
    }
    this.setState({
      breadcrumb
    })
  }

  /** 侧边栏收展 */
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  handleClick = (e) => {
    this.props.history.replace(e.key)
  }

  render() {
    const { routes, location } = this.props
    const { collapsed, breadcrumb } = this.state
    let defaultSelectedKeys = null
    if (location.pathname === route['homePage'] && defaultRouteName) {
      defaultSelectedKeys = [route[defaultRouteName]]
    } else {
      defaultSelectedKeys = [location.pathname]
    }
    return (
      <Layout style={{ minHeight: '100vh' }} className="HomePage">
        <Sider
          theme="light"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">{collapsed ? 'BLOG' : '个人博客后台管理系统'}</div>
          <Menu defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} mode="inline" onClick={this.handleClick}>
            {
              menu.map((fa, faIndex) => {
                return fa.children ? (
                  <SubMenu
                    key={faIndex}
                    title={<span><Icon type={fa.ico} /><span>{fa.name}</span></span>}
                  >
                    {
                      fa.children.map((son) => {
                        return (
                          <Menu.Item key={route[son.routeName]}>
                            {son.name}</Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                ) : (
                    <Menu.Item key={route[fa.routeName]}>
                      <Icon type={fa.ico} />
                      <span>
                        {fa.name}
                      </span>
                    </Menu.Item>
                  )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px', textAlign: 'right' }}>
            <button className="btn-link">admin</button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                breadcrumb[defaultSelectedKeys[0]] && breadcrumb[defaultSelectedKeys[0]].map((item, index) => (
                  <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                ))
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {getRouter(routes, defaultRouteName)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            copyright ©2019 Created by CSJ
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default HomePage