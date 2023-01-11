/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-10 14:41:17
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Dropdown, Menu, message, Space } from 'antd'
import './Navbar.scss'
import Hamburger from '../Hamburger'
import Breadcrumb from '../Breadcrumb'
import { DownOutlined } from '@ant-design/icons'
import { A_logout } from '@/store/actions'
import store from '@/store'
function Navbar(props) {
  const dispatch = useDispatch()
  const [username,setUsername] = useState('')
  const toggleSideBar = () => {
    dispatch({ type: 'R_app_sidebar_opened', data: !props.opened })
  }
  //退出登录
  const loginOut = () => {
    dispatch(props.A_logout).then(() => {
      message.success('退出登录成功')
    })
  }
  useEffect(()=>{
    setUsername(store.getState().user.name)
  })
  const items = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="/">
          首页
        </a>
      )
    },
    {
      key: '2',
      label: (
        <span onClick={loginOut}>
          退出登录
        </span>
      )
    }
  ];
  return (
    <div className="navbar rowBC">
      <div className="rowSC">
        <Hamburger isActive toggleSideBar={toggleSideBar} />
        <Breadcrumb />
      </div>
      {/* 下拉退出登录*/}
      <div className="mr-1">
        <Dropdown
          trigger={['click']}
          menu={{items}}
        >
          <a onClick={(e) => e.preventDefault()}>
          <Space>
            <span className="userName">{username}</span>
            <DownOutlined />
          </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

//配置使用redux
export default connect(
  (state) => ({
    opened: state.app.sidebar.opened
  }),
  { A_logout }
)(Navbar)
