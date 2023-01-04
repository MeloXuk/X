/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-03 16:26:09
 * @LastEditors: kun.xu
 */
import request from '@/utils/axiosReq'

export function loginReq(data) {
  return request({
    url: '/api/base/login',
    data,
    method: 'post',
    bfLoading: false,
    isParams: false,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/api/sys_users/info',
    bfLoading: false,
    method: 'get'
  })
}

export function logoutReq() {
  return request({
    url: '/api/sys_users/logout',
    method: 'post'
  })
}


