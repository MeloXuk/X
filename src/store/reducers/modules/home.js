/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-30 10:06:04
 * @LastEditors: kun.xu
 */
import * as types from '../../action-types'
// import { getToken } from '@/utils/auth'
const bgObj = {
  homeBg:''
}
export default function home(state = bgObj, action) {
  switch (action.type) {
    case types.GET_BG:
      return{
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
