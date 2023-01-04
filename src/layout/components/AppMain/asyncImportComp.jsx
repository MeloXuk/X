/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2022-12-20 14:54:25
 * @LastEditors: kun.xu
 */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
const asyncImportComponent = function (importComp) {
  function AsyncComponent(props) {
    const [Comp, setComp] = useState(null)
    useEffect(() => {
      async function fetchComponent() {
        try {
          const { default: importComponent } = await importComp()
          setComp(() => importComponent)
        } catch (e) {
          console.log(e,'e');
          throw new Error('加载组件出错')
        }
      }
      fetchComponent()
    }, [])
    return Comp ? <Comp {...props} /> : <div className="pl"> </div>
  }
  return AsyncComponent
}

export default asyncImportComponent
