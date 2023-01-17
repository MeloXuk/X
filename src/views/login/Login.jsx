/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-16 10:12:14
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { A_login, A_getUserInfo } from '@/store/actions'
import './login.less'
function Login(props) {
  const [loading, setLoading] = useState(false)
  const [tipMsg, setTipMsg] = useState('')
  const onFinish = (values) => {
    setTipMsg('')
    setLoading(true)
    props
      .A_login(values)
      .then(() => {
        sessionStorage.setItem('userExpireAlarmOpen', '1')
        message.success('登录成功')
      })
      .catch(() => {
        // setTipMsg(res.msg)
        setLoading(false)
      })
  }
  if (props.token) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container columnCC">
      <div className="title-container">
        <h3 className="title text-center">react admin template</h3>
      </div>
      <Form
        autoComplete="off"
        className="widthPx-340"
        initialValues={{ name: 'admin', passwd: 'YTEyMzQ1Ng==' }}
        // initialValues={{ name: 'asdfg', passwd: 'YTEyMzQ1NiE=' }}
        // initialValues={{ name: 'qwert', passwd: 'YTEyMzQ1NiE=' }}
        labelAlign={'left'}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item label="" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="" name="passwd" rules={[{ required: true, message: 'Please input your passwd!' }]}>
          <Input.Password />
        </Form.Item>

        {/*error tip*/}
        <div className="tip-message mrPx-4">{tipMsg}</div>
        <Button className="login-btn" htmlType="submit" loading={loading} type="primary">
          登 录
        </Button>
      </Form>
    </div>
  )
}

//配置使用redux
export default connect(
  (state) => ({
    ...state.user
  }),
  { A_login, A_getUserInfo }
)(Login)
