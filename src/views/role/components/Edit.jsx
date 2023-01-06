/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-04 14:02:19
 * @LastEditTime: 2023-01-06 09:23:39
 * @LastEditors: kun.xu
 */
import { CheckCircleTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Checkbox, Tree, notification  } from 'antd';
import { addRole, updateRole } from '@/api/role'

export default function RoleEdit(props) {
    const { visible,handleCancel,title,treeData,rowData,getList } = props
    const [checkedKeys,setCheckedKeys] = useState([])
    const [defaultExpanded,setDefaultExpanded] = useState([])
    const [form] = Form.useForm();
    const onOk = async ()=>{
        const values = await form.validateFields()
        const roleList = 'p_0_0,'+checkedKeys.toString()+',p_1_3'
        const formData = {...values,pids:roleList,id:rowData.id}
        if(title==='新增'){
          await addRole(formData)
          getList()
          notification.open({
            message: '成功提示',
            description:
              '新增成功',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            duration:1
          })
        }
        if(title==='编辑'){
          await updateRole(formData)
          getList()
          notification.open({
            message: '成功提示',
            description:
              '编辑成功',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            duration:1
          })
        }
    }

    const onCheck = (checkedKeysValue) => {
      setCheckedKeys(checkedKeysValue);
    }

    const handleTree = ()=>{
      let selected = []
      if (rowData.pids) {
        selected = rowData.pids.replace(/ /g, '').split(',').filter(item=>item!=='p_1_3')
      }
      if (!selected.includes('p_0_0')) {
        selected.push('p_0_0')
      }
      setCheckedKeys(selected)
      const arr = []
      const set = new Set(selected)
      treeData.forEach(node => {
        const children = node.children || []
        const hasSelectedChild = children.find(subNode => {
          return set.has(subNode.pid)
        })
        if (hasSelectedChild) {
          arr.push(node.pid)
        }
      })
      setDefaultExpanded(arr)
    }

    useEffect(()=>{
      if(title==='编辑'){
        handleTree()
        form.setFieldsValue({...rowData,role:checkedKeys,needIP:rowData.needIP})
      }
      if(title==='新增'){
        setCheckedKeys([])
        setDefaultExpanded([])
        form.setFieldsValue({role:[],needIP:false,name:''})
      }
    },[rowData])

  return (
    <div>
      <Modal title={title} open={visible} onCancel={handleCancel} onOk={onOk} destroyOnClose>
        <Form
          form={form}
          labelCol={{style: { flexBasis: 90 }}}
          wrapperCol={{style: { flexBasis: 'calc(100% - 90px)' }}}
        >
          <Form.Item label="角色名称" name="name" required>
            <Input placeholder="" autoComplete="off"/>
          </Form.Item>
          <Form.Item label="权限设置" name="role" className="treeClass">
            <Tree
              checkable
              treeData={treeData}
              checkedKeys={checkedKeys}
              expandedKeys={defaultExpanded}
              onCheck={onCheck}
            />
          </Form.Item>
          <Form.Item label="功能配置" required name="needIP" valuePropName="checked">
            <Checkbox>IP验证</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
