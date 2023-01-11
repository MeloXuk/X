/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-11-12 10:17:31
 * @LastEditTime: 2023-01-10 13:33:34
 * @LastEditors: kun.xu
 */

import React from 'react';
import { Button } from 'antd'
import { useHistory } from 'react-router-dom';
export default function Detail() {
  let history = useHistory();
  const goTo = () =>{
    // console.log(history,'history');
    // history.push({pathname: '/chartOne', search: 'test=22222'})
    // console.log(history,'routerData');
    // window.open('/chartOne','_blank')
  //   let params = {
  //     "type": "red",
  //     "id": 25,
  //     "name": "weekdawn"
  //   };
  //  window["filter"] = params;
    history.push({ pathname: '/chartOne', state: { name: 'sunny' } })
    // let param = 1
    // const w=window.open('about:blank');
    // w.location.href=`/#/chartOne?id=${param}`
  //   // w.location.search={
  //   //   a:'b'
  //   // }
  //   console.log(w,'w');
  }
  return (
    <div>
      Detail
      <Button onClick={goTo}>goToChart</Button>
    </div>
  );
}
