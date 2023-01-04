/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-03 09:03:02
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { Fragment, useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
/*其他引入*/
import { isExternal } from '@/utils/validate'
import path from 'path'
import store from '@/store'
import asyncImport from './asyncImportComp'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { asyncRouters,constantRoutes } from '@/router/config'

function RenderRouterHook() {
  const pid = store.getState().user.role
  const resolvePath = (uPath, routePath) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(uPath)) {
      return uPath
    }
    return path.resolve(uPath, routePath)
  }
  let routerArr = []
  routerArr.push(
    <Route
    component={asyncImport(constantRoutes[0].component)}
    exact
    key={constantRoutes[0].path}
    path={constantRoutes[0].path}
    />
  )
  const renderRouterFunc = (asyncRouter, uPath) => {
    for (const item of asyncRouter) {
      // console.log(item,uPath,'item');
      if (item.hasOwnProperty('children')) {
        item.children.forEach((fItem) => {
          if(!pid.includes(fItem.meta.permission)){
            return
          }
          else{
            routerArr.push(
              <Route
                component={asyncImport(fItem.component)}
                exact
                key={fItem.path}
                path={resolvePath(item.path, fItem.path)}
              />
            )
            if (fItem.hasOwnProperty('children')) {
              renderRouterFunc(fItem.children, resolvePath(item.path, fItem.path))
            }
          }
        })
      } else {
        if(!pid.includes(item?.meta?.permission)&&item.path!=='*'){
          return
        }else{
          routerArr.push(
            <Route component={asyncImport(item.component)} exact key={item.path} path={resolvePath(uPath, item.path)} />
          )
        }
      }
      if (item.redirect) routerArr.push(<Redirect exact={true} path={item.path} to={item.redirect} />)
    }
  }
  useEffect(() => {
    renderRouterFunc(asyncRouters, '/')
    // setRes([...arr])
    // console.log(res,'');
  }, [])
  // console.log(routerArr,'routerArr');
  return (
    <div>

      <Fragment>
        {/*动画有点问题*/}
        <TransitionGroup>
          <CSSTransition classNames="fade-main" timeout={300}>
            <Switch>
              {routerArr}
              {/* <Redirect  path="*" to="/404" /> */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    </div>
  )
}

//配置使用redux
export default connect(() => ({}))(RenderRouterHook)
