/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-20 13:27:47
 * @LastEditTime: 2023-01-28 17:27:48
 * @LastEditors: kun.xu
 */
import React, { useRef } from 'react'
import { Button } from 'antd'
import Table from '@/components/table'

const SysAccount = () => {
  const permission = ["handle", "pass", "refuse", "reApply", 'export'], Enum = {
    CREATED: '代办理',
    PASS: '待审批',
    REJECT: '驳回',
    REFUSE: '拒绝'
  };

  const statisticFormat = val => val.map((t, idx) => <span key={idx} style={{marginRight: '5px'}}>{t.total}</span>)

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name', type: 'Link', url: 'https://www.baidu.com' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '状态', dataIndex: 'status', key: 'status', type: 'Enum', Enum },
    { title: '预警统计', dataIndex: 'statistic', key: 'statistic', type: 'Format', format: statisticFormat },
    { title: '存款', dataIndex: 'money', key: 'money', type: 'Currency' },
    { title: '日期', dataIndex: 'date', key: 'date', type: 'Date'},
    { title: '操作', dataIndex: 'action', key: 'action', type: 'Action', value: [
      {label: "查看", click: data => {console.log(data)}},
      {label: "办理", click: data => {}, filter: ({status}) => status == 'CREATED' && permission.some(n => n == 'handle')},
      {label: "通过", click: data => {}, filter: ({status}) => status == 'PASS' && permission.some(n => n == 'pass')},
      {label: "驳回", click: data => {}, filter: ({status}) => status == 'REJECT' && permission.some(n => n == 'reject')},
      {label: "拒绝", click: data => {}, filter: ({status}) => status == 'CREATED' && permission.some(n => n == 'refuse')},
      {label: "重新付款", click: data => {}, filter: ({status}) => status == 'REAPPLY' && permission.some(n => n == 'reApply')}
    ]}
  ]

  const dataSource = [
    {key: 1, name: '小坏', age: 20, status: 'CREATED', date: 1596791666000, statistic: [{level: 3, total: 5}, {level: 2, total: 7}, {level: 1, total: 20}, {level: 0, total: 0}], money: 200000000000},
    {key: 2, name: 'tnnyang', age: 18, status: 'PASS', date: 1596791666000, statistic: [],  money: 2568912357893},
    {key: 3, name: 'xiaohuai', status: 'REJECT', statistic: [], money: 6235871},
    {key: 4, name: '陈公子', age: 21, status: 'REAPPLY', date: 1596791666000, statistic: []}
  ]

  const config = {
    columns,
    dataSource,
    hasCheck: true,  //是否显示表格第一列的checkbox复选框
    getCheckboxProps: record => {return {disabled: record.status == 'REJECT'}}  //table表格rowSelection的禁用
  }

  //点击获取通过checkbox复选框选中的表格
  const childRef = useRef();
  const getTableChecked = () => {
    const selectedRowKeys = childRef.current.getSelectedRowKeys(), selectedRows = childRef.current.getSelectedRows();
    console.log(selectedRowKeys)
    console.log(selectedRows)
  }

  return <div>
    <Table {...config} cRef={childRef} />
    <Button type="primary" onClick={getTableChecked}>获取选择的列表项</Button>
  </div>
}

export default SysAccount