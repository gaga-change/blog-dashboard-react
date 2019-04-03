import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import _route from './config'

/** 路由 前缀 */
export const prefix = ''

/** 根据路由名称，获取对应url */
const temp = {}

function _parseRoutes(routes) {
  routes.forEach(item => {
    item.path = prefix + item.path
    temp[item.name] = item.path
    if (item.routes) {
      _parseRoutes(item.routes)
    }
  })
}
_parseRoutes(_route)

export const route = temp

/** 嵌套子路由 */
export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

function getRouterRoot(routes, defalutRouteName) {
  return (
    <Router>
      {getRouter(routes, defalutRouteName)}
    </Router>
  )
}

export function getRouter(routes, defalutRouteName) {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
      {!!defalutRouteName && <Redirect to={route[defalutRouteName]} />}
    </Switch>
  )
}

/** 第一层级路由 */
export default () => getRouterRoot(_route, 'homePage')