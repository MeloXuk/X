/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-03 15:03:57
 * @LastEditTime: 2023-01-16 10:21:38
 * @LastEditors: kun.xu
 */
import request from '@/utils/axiosReq'


export function getExpiringUsers(data) {
    return request({
      url: '/api/users/expiring',
      method: 'get',
      data: data,
      isParams: true
    })
  }



