/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-06 14:59:57
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import SvgIcon from '@/icons/svg-icon'
import './Icon.scss'
function Icon(props) {
  return (
    <Fragment>
      {props.icon && (
        <div className="nav-icon">
          <SvgIcon iconClass={props.icon} />
        </div>
      )}
    </Fragment>
  )
}

export default Icon
