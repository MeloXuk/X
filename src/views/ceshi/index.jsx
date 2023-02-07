/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-11-12 10:17:31
 * @LastEditTime: 2023-02-01 16:46:20
 * @LastEditors: kun.xu
 */

import React,{ useState,useEffect} from 'react'
import { getToken } from '@/utils/auth'
export default function Ceshi() {
  const [socket,setSocket] = useState({})
  const [resData,setResData] = useState('')
  const init = () => {
    const token = getToken()
    if(typeof (WebSocket) === 'undefined') {
      console.log(111222);
    } else {
      console.log(`ws://${window.location.host}/api/ws/detail?system=1001`,'111');
      setSocket(new WebSocket(`ws://10.253.50.11:9527/api/ws/notice`, [token]))
      socket.onopen = onOpen
      socket.onerror = onError
      socket.onmessage = (res) => {
        const resData = JSON.parse(res.data)
        setResData(resData)
      }
      socket.onclose = onClose
    }
  }
  const onOpen = () => {

  }
  const onError = () => {

  }
  // const onMessage = (res) => {
  //   const resData = JSON.parse(res.data)
  //   console.log(resData,'resData');
  // }
  const onClose = (event) => {
    if(event.reason){
      console.log(event.reason);
    }
  }
  useEffect(()=>{
    init()
  },[resData])
//   useEffect(() => {
//     let url= `ws://${window.location.host}/api/ws/report`;//服务端连接的url
//         createWebSocket(url)
//         let messageSocket=null;
//         messageSocket = PubSub.subscribe('message',getMsg)
//         //在组件卸载的时候，关闭连接
//          return ()=>{
//             PubSub.unsubscribe(messageSocket);
//             closeWebSocket();
//         }
// }, []);

// const sendMsg=()=>{
//     let msg='发送消息'
//     websocket&&websocket.send(msg)
//     console.log('ws发送')
// }

// const getMsg=(topic,message)=>{
//     console.log('ws获取：',message)
// }
    return(
        <div>
            <div>222</div>
        </div>
    )
}
