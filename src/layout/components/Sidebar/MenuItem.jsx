/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-10 16:51:39
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { useState }  from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { asyncRouters } from '@/router/config'
import { Menu } from 'antd'
import store from '@/store'
import Icon from './Icon'
function menuItem(props) {
  /*侧边栏默认选中和展开*/
  const rootSubmenuKeys = ['/sys-account-manage', '/system-monitoring', '/system-config','/operator','/data-report','/log-management'];
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  let history = useHistory()
  const pid = store.getState().user.role
  const filterAsyncRoutes=(routes, permissions)=> {
    const res = []
    routes.forEach(route => {
      route = { ...route }
      const children = route.children
      if (!route.meta || children) {
        route.label = route?.meta?.title || route.title
        if(route.label==='首页'){
          route.icon =<Icon icon={route?.icon} />
        }else{
          route.icon = <Icon icon={route?.meta?.icon} />

        }
        route.key =route.path
        if (children) {
          const accessedChild = filterAsyncRoutes(children, permissions)
          if (accessedChild.length) {
            res.push(route)
            route.children = accessedChild
          }
        } else {
          res.push(route)
        }
      } else if (permissions.includes(route.meta.permission)) {
        route.label = route?.meta?.title || route.title
        if(route.label==='首页'){
          route.icon =<Icon icon={route?.icon} />
        }
        route.icon = <Icon icon={route?.meta?.icon} />
        route.icon = <Icon icon={route?.meta?.icon} />
        route.key =route.path
        res.push(route)
      }
    })
    return res
  }
  const arr = filterAsyncRoutes(asyncRouters,pid)
  console.log(arr,'arr');
  const onClick = (MenuItem) => {
    if(MenuItem.key==='/') return  history.push('/')
    history.push(MenuItem.keyPath[1]+MenuItem.keyPath[0])
  }
  return (
    <Menu
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={!props.opened}
      inlineIndent="10"
      mode="inline"
      theme="dark"
      items={arr}
      onClick={onClick}
    >
    </Menu>
  )
}

//配置使用redux
export default connect((state) => ({
  opened: state.app.sidebar.opened
}))(menuItem)
