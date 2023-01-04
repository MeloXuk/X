/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2022-12-20 14:29:23
 * @LastEditors: kun.xu
 */
import * as types from '../../action-types'
import { getToken } from '@/utils/auth'
const userInfo = {
  name: '',
  role: '',
  avatar: '',
  token: getToken()
}
export default function user(state = userInfo, action) {
  switch (action.type) {
    case types.USER_TOKEN:
      return {
        ...state,
        token: action.data
      }
    case types.USER_USER_INFO:
      return {
        ...state,
        ...action.data
      }
    case types.USER_RESET:
      return {}
    default:
      return state
  }
}
