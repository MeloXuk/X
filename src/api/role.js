/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-03 15:03:57
 * @LastEditTime: 2023-01-03 16:27:06
 * @LastEditors: kun.xu
 */
import request from '@/utils/axiosReq'


export function getRoles(data) {
    return request({
      url: 'api/roles',
      method: 'get',
      data: data,
      isParams: true
    })
  }

/**
   * 获取权限列表
   * @param { Object }
   */
 export function getPermissions() {
  return request({
    url: '/permissions',
    method: 'get'
  })
}

/**
 * 删除角色
 * @param { String } rid 角色id
 */
 export function deleteRole(data) {
  return request({
    url: '/roles',
    method: 'delete',
    params: data
  })
}


/**
 * 添加角色
 * @param { Object } data
 * {
 *   name: 角色名称
 *   permissions: 角色权限，以逗号分割
 * }
 */
 export function addRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

/**
 * 更新角色
 * @param { Object } data
 * {
 *   rid: 角色id
 *   permissions: 角色权限，以逗号分割
 * }
 */
 export function updateRole(data) {
  return request({
    url: `/roles`,
    method: 'patch',
    data
  })
}