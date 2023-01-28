/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-28 17:25:44
 * @LastEditTime: 2023-01-28 17:26:02
 * @LastEditors: kun.xu
 */
import React, { createElement, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Table } from 'antd';
import { timestampToTime, currency } from '@/utils'

const h = createElement;
const TableComp = ({columns, dataSource, hasCheck, cRef, getCheckboxProps}) => {
  const empty = '-',
    [selectedRowKeys, setSelectedRowKeys ] = useState([]),
    [selectedRows, setSelectedRows] = useState([]),
    render = {
      Default: v => v,
      Enum: (v, {Enum}) => {
        if(!Enum[v]) return empty;
        return Enum[v]
      },
      Format: (v, {format}, row) => format(v, row),
      Currency: v => currency(v),
      Date: v => timestampToTime(v, 'second'),
      Link: (v, {url}) => <Link to={url}>{v}</Link>,
      Action: (v, {value}, row) => {
        const result = value.filter(n => {
          const {filter = () => true} = n
          return filter(row)
        })

        return result.map(t => <span className="table-link" onClick={() => t.click(row)} key={t.label}>{t.label}</span>)
      }
    }

  columns = columns.map(n => {
    const { type = 'Default' } = n;
    return {...n, render: (v, row) => (!v || v.length < 1) && type != 'Action' ? empty : render[type](v, n, row)}
  })

  //父组件获取selectedRowKeys的方法-cRef就是父组件传过来的ref
  useImperativeHandle(cRef, () => ({
    //getSelectedRowKeys就是暴露给父组件的方法
    getSelectedRowKeys: () => selectedRowKeys,
    getSelectedRows: () => selectedRows
  }));

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => getCheckboxProps(record)
  };

  return hasCheck ? h(Table, {columns, dataSource, rowSelection}) : h(Table, {columns, dataSource})
}

TableComp.propTypes = {
  columns: PropTypes.array.isRequired,    //表格头部
  dataSource: PropTypes.array.isRequired, //表格数据
  hasCheck: PropTypes.bool,               //表格行是否可选择
  cRef: PropTypes.object,                 //父组件传过来的获取组件实例对象或者是DOM对象
  getCheckboxProps: PropTypes.func       //选择框的默认属性配置
}

export default TableComp