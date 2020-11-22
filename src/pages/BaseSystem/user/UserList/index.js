import React, {useEffect, useRef, useState} from 'react';

import {Grid, Card, Icon, Dialog, Loading, Pagination} from '@alifd/next';

import {userFreeze, userList, userRemove, userReset, userUnfreeze} from '@/Config/ApiUrl/system/user';
import Message from '@/components/Message';
import Table from '@/components/Table';
import {Form, Input, Button, Switch} from 'antd';
import {useRequest} from '@/util/Request';
import {UserOutlined} from '@ant-design/icons';
import AddButton from "@/components/AddButton";
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import UserEdit from "@/pages/BaseSystem/user/UserEdit";
import Drawer from "@/components/Drawer";
import UserRole from "@/pages/BaseSystem/user/UserRole";

const UserList = () => {
  const ref = useRef(null);
  const dfRef = useRef(null);
  const roRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <Form.Item name="name" label="名称">
          <Input.Search placeholder="按名称搜索" onSearch={() => {
            ref.current.submit();
          }} enterButton/>
        </Form.Item>
      </>
    );
  };

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          dfRef.current.open(false);
        }}/>
      </>
    );
  }

  const [roleUserId, setRoleUserId] = useState(null);

  // 冻结账号
  const {run: freezeRun} = useRequest(userFreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess: () => ref.current.refresh()
    });
  const freeze = async (userId) => {
    freezeRun({data: {userId}});
  };

  // 解冻账号
  const {run: unfreezeRun} = useRequest(userUnfreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess: () => ref.current.refresh()
    });
  const unfreeze = (userId) => {
    unfreezeRun({data: {userId}});
  };


  const {run: resetRun} = useRequest(userReset,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      }
    });

  const reset = async (userId) => {
    resetRun({
      data: {userId},
    });
  };

  const columns = [
    {
      title: '账号',
      dataIndex: 'account'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sexName'
    },
    {
      title: '部门',
      dataIndex: 'deptName'
    },
    {
      title: '职位',
      dataIndex: 'positionName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '状态',
      render: (value, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="冻结"
            style={{width: 60}}
            defaultChecked={record.status === 'ENABLE'}
            onChange={(checked) => {
              if (checked) {
                unfreeze(record.userId);
              } else {
                freeze(record.userId);
              }
            }}
          />
        );
      }
    },
    {
      title: '操作',
      align: 'right',
      render: (value, record) => {
        return (
          <>
            <Button type='ghost' className="button-left-margin" onClick={() => {
              roRef.current.open(record.userId);
            }}>分配角色</Button>
            <Button type='ghost' className="button-left-margin" onClick={() => {
              Dialog.confirm({
                title: '提示',
                content: '系统初始化为111111，实际请参考系统设置。',
                onOk: () => {
                  reset(record.userId);
                },
                onCancel: () => {
                }
              });
            }}>重置密码</Button>
            <EditButton onClick={() => {
              dfRef.current.open(record.userId);
            }}/>
            <DelButton/>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Table
        ref={ref}
        title={<h2><UserOutlined/> 用户管理</h2>}
        api={userList}
        columns={columns}
        rowKey="userId"
        searchForm={searchForm}
        actions={actions()}
      />
      <Drawer ref={dfRef} component={UserEdit} onSuccess={() => {
        ref.current.refresh();
        dfRef.current.close();
      }}/>
      <Drawer ref={roRef} component={UserRole} onSuccess={() => {
        ref.current.refresh();
        roRef.current.close();
      }}/>
    </>
  );
};

export default UserList;
