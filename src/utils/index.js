/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-28 17:26:31
 * @LastEditTime: 2023-01-28 17:26:44
 * @LastEditors: kun.xu
 */
export const timestampToTime = (timestamp, type) => {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + '';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    if (type == 'second') {
      return Y + M + D + ' ' + h + m + s;
    } else {
      return Y + M + D
    }
  }

  export const currency = v => {
    let [n, d = []] = v.toString().split('.');
    return [n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')].concat(d).join('.');
  };