import request from '@/utils/axiosReq'
/**
   * 获取版本信息
   * @param { Object } data
   * {
   *   data: 过滤条件
   * }
   */
export function getVersion(data) {
  return request({
    url: '/api/base/version',
    method: 'get',
    params: data,
    isParams: true
  })
}

/**
   * 获取背景图
   * @param { Object } data
   * {
   *   data: 过滤条件
   * }
   */
export function getBg(data) {
    return request({
      url: '/api/system_setting/home_bg',
      method: 'get',
      params: data,
      isParams: true
    })
  }