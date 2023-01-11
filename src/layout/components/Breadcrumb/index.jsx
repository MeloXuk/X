/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-11 10:31:23
 * @LastEditors: kun.xu
 */
/* react redux */
// eslint-disable-next-line no-use-before-define
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { asyncRouters } from '@/router/config'
import './breadCrumb.scss'
function index() {
  //获取path
  let location = useLocation()
  let pathNameArr = location.pathname.split('/')
  let subTitle = '/'+ pathNameArr[pathNameArr.length-1]
  let mainTitle = '/'+pathNameArr[1]
  const [breadName,setBreadName] = useState([])
  const handleRoutes = (arr) =>{
    let res = []
    arr.forEach(item=>{
      if(!item.children){
        res.push(item)
      }else{
        res.push(item)
        item.children.forEach(children=>{
           res.push({...children,key:item.path+children.path})
        })
      }
    })
    let newArr = []
    if(subTitle==='/') {
      newArr.push({meta:{title:'首页'},path:'/'})
      setBreadName(newArr)
      return
    }else{
      newArr.push(res.filter(item=>item.path===mainTitle)[0])
      newArr.push(res.filter(item=>item.path===subTitle)[0])
      setBreadName(newArr)
    }
  }
  useEffect(() => {handleRoutes(asyncRouters)}, [location])
    return (
      <div className={'ml-1'}>
        <Breadcrumb>
          {breadName.map((item,index) => {
            return (
              <Breadcrumb.Item key={index}>
                <span className="cursorDefault">{item?.meta?.title}</span>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </div>
    )
}

//配置使用redux
export default connect((state) => ({
  countNum: state.count.countNum
}))(index)
