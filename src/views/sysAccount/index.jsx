/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-11-12 10:17:31
 * @LastEditTime: 2023-01-04 14:40:07
 * @LastEditors: kun.xu
 */

import React,{useState} from 'react';
import { Button, Modal } from 'antd';

export default function sysAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(11111);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <div>111</div>
    <div>{isModalOpen}</div>
    <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  </>
  );
}