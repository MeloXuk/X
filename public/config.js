/*
 * @Description: 
 * @Author: kun.xu
 * @Date: 2022-01-26 11:05:48
 * @LastEditTime: 2023-01-29 14:36:24
 * @LastEditors: kun.xu
 */
let logo ='kingstar'   //配置logo、背景图、系统名称（默认kingstar  可配置'kingstar','shenwan','haitong'）
let title = '奎因极速行情系统'  //配置顶部title栏名称(默认‘奎因极速行情系统’)
const roomNum = '1' // 配置机房数量(1或2)(默认为1)
window.globalConfig={
    api:{
        // 线上环境
        baseUrl:`${window.location.protocol}`,
        wsUrl:`ws://${window.location.host}`
    },
    logo:logo,
    title:title,
    roomNum:roomNum
}