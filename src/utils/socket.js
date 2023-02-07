/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-02-01 14:22:25
 * @LastEditTime: 2023-02-01 14:22:33
 * @LastEditors: kun.xu
 */
import { useState, useRef, useEffect } from 'react'

const useWebsocket = ({ url, verify }) => {
  const ws = useRef(null)
  const [wsData, setMessage] = useState('')
  const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' })

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接正在关闭' },
      { key: 3, value: '连接已关闭或者没有链接成功' }
    ]
    try {
      ws.current = new WebSocket(url)

      ws.current.onopen = (_e) => setReadyState(stateArr[ws.current?.readyState ?? 0])

      ws.current.onclose = (e) => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }

      ws.current.onerror = (e) => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }

      ws.current.onmessage = (e) => {
        setMessage(e.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const webSocketInit = () => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket()
    }
  }

  //  关闭 WebSocket
  const closeWebSocket = () => {
    ws.current?.close()
  }

  const reconnect = () => {
    try {
      closeWebSocket()
      ws.current = null
      creatWebSocket()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    verify && webSocketInit()
    return () => {
      ws.current?.close()
    }
  }, [ws, verify])

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect
  }
}
export default useWebsocket