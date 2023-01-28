/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-20 15:12:13
 * @LastEditTime: 2023-01-20 09:05:44
 * @LastEditors: kun.xu
 */


import React from 'react';
import './404.scss'
import errorImg from '@/assets/404.svg'
export default function error() {
  return (
    <div className="containerErrorPage">
      <img className="svgLogo" src={errorImg} />
      <div className="btnBox">
        <a className="button" href="/">back to home</a>
      </div>
    </div>
  );
}
