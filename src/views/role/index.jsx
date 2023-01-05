import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Col, Row, Table, Space } from 'antd'
import Edit from './components/Edit'
import { getRoles, getPermissions, deleteRole } from '@/api/role'
import "./role.scss"
export default function Role() {
  const [form] = Form.useForm();
  const [roleList,setRoleList] = useState([])
  const [loading, setLoading] = useState(false)
  const [treeData,setTreeData] = useState([])
  const [visible,setVisible] = useState(false)
  const [rowData,setRowData] = useState([])
  const [title,setTitle] = useState('')
  const [pagination, setPagination] = useState({
    total: null,
    pageSize: null,
    current: null,
    showSizeChanger: null,
    showQuickJumper: null,
    showTotal: (total) => {
      return (
         <span
            style={{
               fontSize: 16,
               color: '#264653',
               fontFamily: "微软雅黑"
            }}
         >共{total}条数据</span>
     )
  }
  })

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align:'center'
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align:'center'
    },
    {
      title: '操作',
      dataIndex: 'op',
      align:'center',
      render: (_, record) =>
        record.id !== 1?
        (
          <Space>
            <Button onClick={()=>edit(record)} type="primary" status="primary">
              编辑
             </Button>
            <Button onClick={() => del(record.id)} type="danger" status="danger">
              删除
            </Button>
          </Space>
        ):
        (<Space></Space>)
    }
  ]

  const onFinish = (values)=>{
    getRoleList({...values,page:1,limit:10})
  }

  const edit = (record) =>{
    setVisible(true)
    setRowData(record)
    setTitle('编辑')
  }

  const handleCancel = () =>{
    setVisible(false)
  }

  const del = async (id) =>{
    await deleteRole({id:id})
    const totalPage = Math.ceil((pagination.total - 1) / pagination.pageSize) // 总页数
    pagination.current = pagination.current > totalPage ? totalPage : pagination.current
    pagination.current = pagination.current < 1 ? 1 : pagination.current
    getRoleList({page:pagination.current,limit:pagination.pageSize})
  }

  const reset = ()=>{
    form.resetFields()
    getRoleList({page:1,limit:10})
  }

  const add = ()=>{
    setVisible(true)
    setTitle('新增')
    setRowData([])
  }

  const getPermissionsList = async() =>{
    const res = await getPermissions()
    const newData = res.data.filter(item => item.label !== '用户信息')
    const parentMap = new Map()
    const parentNodes = newData.filter(node => !node.parent)
    parentNodes.forEach(node => {
      node.children = []
      parentMap.set(node.pid, node.children)
      if (node.pid === 'p_0_0') {
        node.disabled = true
      }
    })
    newData.forEach(node => {
      const parent = node.parent
      const arr = parentMap.get(parent)
      node.key = node.pid
      node.title = node.label
      if (arr) {
        arr.push(node)
      }
    })
    setTreeData(parentNodes)
  }

  const getRoleList = async (data) =>{
    const res =await getRoles(data)
    setRoleList(res.data.data)
    setPagination({
      ...pagination,
      pageSize:res.data.limit,
      current:res.data.page,
      total:res.data.total,
      showSizeChanger: true,
      showQuickJumper: true
    })
  }

  const getList =()=>{
    let currentPage
    if(title==='新增'){
      const currentSize = pagination.total%pagination.pageSize
      currentPage = Math.ceil(pagination.total/pagination.pageSize)
      if(currentSize===0){
        currentPage = currentPage+1
      }
    }else{
      currentPage=pagination.current
    }
    getRoleList({page:currentPage,limit:pagination.pageSize})
    setVisible(false)
  }

  const onChangeTable = async (pagination) =>{
    setLoading(true)
    await getRoleList({page:pagination.current,limit:pagination.pageSize})
    setLoading(false);
  }

  useEffect(()=>{
    getRoleList({page:1,limit:10})
    getPermissionsList()
  },[])

  return (
    <div>
      <Form
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        labelCol={{span: 5}}
        wrapperCol={{span: 16}}
        className="form"
      >
        <Row>
          <Col span={10}>
            <Form.Item label="角色名称" name="name">
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </Col>
          <Col span={10} className="marginLeft210">
            <Form.Item wrapperCol={{ offset: 5 }} className="textAlignRight">
              <Button type="primary" htmlType="submit" className="btn">
                查询
              </Button>
              <Button type="outline"  onClick={reset} className="btn">
                重置
              </Button>
              <Button type="primary" className="btn" onClick={add}>
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        loading={loading}
        scroll={{y: 460}}
        columns={columns}
        dataSource={roleList}
        rowKey="id"
        pagination={pagination}
        onChange={onChangeTable}
      />
      <Edit
        visible={visible}
        handleCancel={handleCancel}
        title={title}
        rowData={rowData}
        treeData={treeData}
        getList={getList}
      >
      </Edit>
    </div>
  )
}

