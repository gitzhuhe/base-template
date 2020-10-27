import React from 'react';
import {Form, Input, Button, Alert} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from 'ice';
import {useRequest} from '@/util/Request';
import {login as loginUrl} from '@/Config/ApiUrl';
import cookie from 'js-cookie';

const FormItem = Form.Item;

export default function Login({submitText}) {

  const history = useHistory();

  const {run, data, error, loading} = useRequest(loginUrl, {
    manual: true,
    onSuccess: (result) => {
      console.log(result);
      cookie.set('Authorization', result);
      history.replace('/');
    }
  });


  return (
    <Form
      initialValues={{remember: true}}
      onFinish={async (values) => {
        run({
          data: values
        });
        // setResult(result);
      }}
    >
      <FormItem
        name="username"
        rules={[{required: true, message: '请填写：手机号/邮箱/账号'}]}
      >
        <Input
          prefix={<UserOutlined/>}
          name="account"
          placeholder="手机号/邮箱/账号"
        />
      </FormItem>
      <FormItem
        name="password"
        rules={[
          {required: true, message: '请填写密码'},
          () => ({
            validator(rule, value) {
              if (!value || value.length >= 6) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码长度不应低于6位!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined/>}
          type="password"
          placeholder="请填写最低长度为6位的密码"
        />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit" block loading={loading}>
          {submitText || `登 录`}
        </Button>
      </FormItem>
      {error && <Alert message={error.message} type="error"/>}
      {data && <Alert message="登录成功，请稍候..." type="success"/>}
    </Form>
  );
}

Login.propTypes = {};

Login.defaultProps = {};
