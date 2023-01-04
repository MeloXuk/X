import React, { useEffect,useState } from 'react'
import { Button, Form, Input, Col, Row, Table,Space } from 'antd'
import { getRoles } from '@/api/role'
import "./role.scss"
export default function Role() {
  const [form] = Form.useForm();
  const [roleList,setRoleList] = useState([])
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    // sizeCanChange: true,
    // showTotal: true,
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
    // pageSizeChangeResetCurrent: true
    // showQuickJumper:'
  });
  const onFinish = (values)=>{
    console.log(values,'values');
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
  const getRoleList = async (data) =>{
    const res =await getRoles(data)
    setRoleList(res.data.data)
    console.log(roleList,'roleList');
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
    console.log(current,'current');
    console.log(pageSize,'pageSize');
    setLoading(true);
    await getRoleList({page:current,limit:pageSize})
    setLoading(false);
  }
  useEffect(()=>{
    getRoleList({page:1,limit:10})
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
              <Button type="primary" className="btn">
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
    </div>
  )
}

