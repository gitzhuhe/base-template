import React, {useState, useEffect} from 'react';

import {useRequest} from '@/Config/BaseRequest';
import {deptTree} from '@/Config/ApiUrl/system/dept';
import {Tree} from '@alifd/next';

import styles from './index.module.scss';

const TreeNode = Tree.Node;

const DeptTree = ({onSelect}) => {

  const {request} = useRequest(deptTree);
  const {run:get,data} = request();

  const renderTreeNode = (data) => {
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((item) => {
      if (item.children && item.children.length > 0) {
        return (<TreeNode label={item.title} key={item.key}>{renderTreeNode(item.children)}</TreeNode>);
      } else {
        return (<TreeNode label={item.title} key={item.key}/>);
      }
    });
  };

  return data?
    <Tree
      className={styles.DetpTree}
      showLine
      defaultExpandAll
      onSelect={(selectedKeys, extra) => {
        typeof onSelect === 'function' && onSelect(selectedKeys, extra);
      }}
    >
      {renderTreeNode(data.data)}
    </Tree>:null
};
export default DeptTree;
