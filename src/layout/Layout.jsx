/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2023-01-17 13:59:17
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Navbar, AppMain } from './components'
import store from '@/store'
import { Modal, Table } from 'antd';
import './Layout.scss'
import { getExpiringUsers } from '@/api/externalUser';
function Layout(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [thirtyList, setThirtyList] = useState([])
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
      title: '用户名称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '开始时间',
      dataIndex: 'beginDate',
      align:'center'
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      align:'center'
    },
    {
      title: '激活日期',
      dataIndex: 'activateDate',
      align:'center'
    }
  ]
  const getThirtyList = async () => {
    setLoading(true)
    const res = await getExpiringUsers({page:1,limit:5})
    setPagination({
      ...pagination,
      pageSize:res.data.limit,
      current:res.data.page,
      total:res.data.total,
      showSizeChanger: true,
      showQuickJumper: true
    })
    setThirtyList(res.data.data)
    setLoading(false)
  }
  const onChangeTable = async (pagination) =>{
    setLoading(true)
    await getExpiringUsers({page:pagination.current,limit:pagination.pageSize})
    setLoading(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    const userRole = store.getState().user.role
    const hasPermissions = 'p_3_0,p_3_1,p_3_2,'
    getThirtyList()
    if(sessionStorage.getItem('userExpireAlarmOpen') === '1' && userRole.includes(hasPermissions)){
      setIsModalOpen(true)
      sessionStorage.setItem('userExpireAlarmOpen','0')
    }
  },[])
  return (
    <div className={`${!props.opened && 'closeSidebar'} container`} >
      {/* left container*/}
      <Modal title="" open={isModalOpen} className="thirtyList" footer={null} onCancel={handleCancel}>
        <div className="thirtyListTableTitle">30天到期用户列表</div>
        <Table
          loading={loading}
          scroll={{y: 460}}
          columns={columns}
          dataSource={thirtyList}
          rowKey="id"
          pagination={pagination}
          onChange={onChangeTable}
          maskClosable="false"
          className="thirtyListTable"
        />
      </Modal>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      {/*right container*/}
      <div className="main-container">
        <Navbar />
        <AppMain />
      </div>
    </div>
  )
}
export default connect(
  (state) => ({
    opened: state.app.sidebar.opened
  }),
  {}
)(Layout)
