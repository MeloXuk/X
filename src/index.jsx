/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-06 08:56:50
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//引入antd的样式
// import 'antd/dist/antd.css'
import 'antd/dist/reset.css';
//自定义样式
import './styles/index.scss'
//svg-icon
import 'virtual:svg-icons-register'

//error log collect
import '@/views/error-log/errorLogCollect'
ReactDOM.render(<App />, document.getElementById('root'))
