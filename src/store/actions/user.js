/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2022-12-20 14:29:26
 * @LastEditors: kun.xu
 */
import * as types from '../action-types'
import { getInfoReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { loginReq, logoutReq } from '@/api/user'

export const A_USER_TOKEN = (data) => {
  return {
    type: types.USER_TOKEN,
    data
  }
}

export const A_USER_USER_INFO = (data) => {
  return {
    type: types.USER_USER_INFO,
    data
  }
}

export const A_resetUser = () => {
  return {
    type: types.USER_RESET
  }
}

export const A_login = (reqData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    loginReq({ name: reqData.name.trim(), passwd: reqData.passwd })
      .then((res) => {
        const { token } = res?.data
        if (token) {
          dispatch(A_USER_TOKEN(token))
          setToken(token)
          resolve(res?.data)
        } else {
          reject()
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const A_logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    logoutReq(token)
      .then((res) => {
        if (res.msg === 'OK') {
          dispatch(A_resetUser())
          removeToken()
          resolve()
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const A_getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getInfoReq(token)
      .then((response) => {
        const { data } = response
        const { name,role } = data
        let userInfo = {
          // role: 'admin',
          role:role.pids,
          name: name
        }
        dispatch(A_USER_USER_INFO(userInfo))
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
