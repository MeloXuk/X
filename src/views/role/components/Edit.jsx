/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2023-01-04 14:02:19
 * @LastEditTime: 2023-01-04 17:52:41
 * @LastEditors: kun.xu
 */
import React, { useEffect, useState,useMemo } from 'react';
import { Modal,Form, Input,Checkbox,Button,Tree } from 'antd';

export default function RoleEdit(props) {
    const { visible,handleCancel,title,treeData,rowData } = props
    const [form] = Form.useForm();
    const onOk = async ()=>{
        const values = await form.validateFields()
        console.log(values,'111');
    }
    const defaultSelected = useMemo(()=>{
        let selected = []
        if (rowData.pids) {
          selected = rowData.pids.replace(/ /g, '').split(',')
        }
        if (!selected.includes('p_0_0')) {
          selected.push('p_0_0')
        }
        console.log(selected,'selected');
        return selected
    },[rowData])
    // const defaultExpanded=useMemo(()=>{

    //         const arr = []
    //         console.log(treeData,'defaultSelected1111');
    //         const set = new Set(defaultSelected)
    //         console.log(set,'set');
    //         treeData.forEach(node => {
    //           const children = node.children || []
    //           // 全选的不展开level
    //           if (set.has(node.pid)) {
    //             console.log(3333);
    //             return
    //           }

    //           console.log(children, 'children')
    //           const hasSelectedChild = children.find(subNode => {
    //             console.log(set.has(subNode.pid), 'subNode')
    //             return set.has(subNode.pid)
    //           })
    //           console.log(hasSelectedChild,'hasSelectedChild');
    //           if (hasSelectedChild) {
    //             console.log(111);
    //             arr.push(node.pid)
    //           }
    //         })
    //         return arr

    // },[treeData,defaultSelected])
  return (
    <div>
      <Modal title={title} visible={visible} onCancel={handleCancel} onOk={onOk}>
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
              defaultCheckedKeys={defaultSelected}
              // defaultExpandedKeys={defaultExpanded}
            />
          </Form.Item>
          <Form.Item label="功能配置" required name="needIP" valuePropName="checked">
            <Checkbox>IP验证</Checkbox>
          </Form.Item>
        </Form>
        <div>{defaultSelected}</div>
        {/* <div>{defaultExpanded}</div> */}
      </Modal>
    </div>
  );
}
