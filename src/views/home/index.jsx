/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-11-12 10:17:31
 * @LastEditTime: 2023-01-29 14:58:48
 * @LastEditors: kun.xu
 */

import React, { useState, useEffect } from 'react';
import { getVersion, getBg } from '@/api/common'
import './home.scss'

export default function Home() {
  const [version,setVersion] = useState('')

  useEffect(()=>{
    console.log(window.globalConfig,'globalConfig')
    // setVersion(window.)
    getVersionFunc()
    getPicFunc()
  },[])
  const getVersionFunc = async () =>{
    const res = await getVersion()
    // console.log(res,'res');
    setVersion(res.data.version)
  }
  const getPicFunc = async () => {
    const res = await getBg()
    console.log(res,'resPic');
  }
  return (
    <div className="bk" >
      <div className="logo">
        <p>申万宏源证券FPGA极速行情系统</p>
        <p>海通期货FPGA极速行情系统</p>
        <i className="ks-icon-kslogo" />
        <p>奎因极速行情系统</p>
        <p className="version" >{version}</p>
      </div>
    </div>)
};
