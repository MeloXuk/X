import React, { useEffect,useState } from 'react'
import { Button, Form, Input, Col, Row, Table, Space,Modal } from 'antd'
import Edit from './components/Edit'
import { getRoles,getPermissions } from '@/api/role'
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
  });
  const onFinish = (values)=>{
    console.log(values,'values');
  }
  const edit = (record) =>{
    console.log(record,'record');
    setVisible(true)
    setRowData(record)
    setTitle('编辑')
  }
  const handleCancel = () =>{
    setVisible(false)
  }
  const showDel = (id) =>{
    console.log(id,'id');
  }
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
            <Button onClick={() => showDel(record.id)} type="primary" status="danger">
              删除
            </Button>
          </Space>
        ):
        (<Space></Space>)
    }
  ];
  const reset = ()=>{
    form.resetFields()
  }
  const add = ()=>{
    setVisible(true)
    setTitle('新增')
  }
  const getPermissionsList = async() =>{
    const res = await getPermissions()
    const newData = res.data.filter(item => item.label !== '用户信息')
    // }
    const parentMap = new Map()
    // 第一层节点
    const parentNodes = newData.filter(node => !node.parent)
    parentNodes.forEach(node => {
      node.children = []
      parentMap.set(node.pid, node.children)
      // 首页默认不可编辑
      if (node.pid === 'p_0_0') {
        node.disabled = true
      }
    })
    // 第二层节点
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
  const onChangeTable = async (pagination) =>{
    const { current, pageSize } = pagination;
    setLoading(true);
    await getRoleList({page:current,limit:pageSize})
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
            <Form.Item label="角色名称" name="name" rules={[{ required: true }]} >
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
      >
      </Edit>
    </div>
  )
}

