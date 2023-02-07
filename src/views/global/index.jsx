/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-11-12 10:17:31
 * @LastEditTime: 2023-02-07 10:21:55
 * @LastEditors: kun.xu
 */

import React, { useState, useRef, useLayoutEffect, useEffect} from 'react';
import { getToken } from '@/utils/auth'
export default function Global() {
  const ws = useRef(null)
  const token = getToken()
  const [message,setMessage] = useState('')
  useEffect(()=>{
    ws.current = new WebSocket(`ws://10.253.50.11:9527/api/ws/notice`,[token])
    console.log(ws.current,'current');
    ws.current.onmessage = e => {
      console.log(e,'e');
      // setMessage(e)
    }
    return () => {
      ws.current?.close()
    }
  },[ws])
  return (
    <div>
      Global
      {message}
    </div>
  );
}
