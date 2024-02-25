import React from "react"
import { Form, Checkbox, Input, Button, Card, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { updateUserInfo } from "@src/store/userInfoSlice"
import apiMap from "@src/api/apiMap"
import { post, get, uploadFile } from "@src/api/request"
import { Link, useHistory } from "react-router-dom"

const FormItem = Form.Item
const InputStyle = { width: "240px" }
const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async values => {
    const res: any = await post(apiMap.login, {
      userName: values["username"],
      password: values["password"]
    })
    if (res.code === 200) {
      message.success(res.message)
      const { data } = res
      dispatch(
        updateUserInfo({
          token: data.token,
          userName: data.userName || values["username"]
        })
      )
      history.push("/home")
    } else {
      message.error(res.message)
    }
    // dispatch(updateUserInfo(payload))
    console.log("Success:", values)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  return (
    <Card title="登录验证" style={{ width: "500px", margin: "20px auto" }}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 260, margin: "20px auto" }}>
        <FormItem
          name="username"
          label="账号"
          style={InputStyle}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          rules={[{ required: true, message: "用户名必填" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem
          name="password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          label="密码"
          style={InputStyle}
          rules={[{ required: true, message: "密码必填" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem>
          <FormItem name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </FormItem>
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            登录
          </Button>
          <Link to="/register">
            <Button
              type="primary"
              style={{ marginLeft: 20 }}
              className="login-form-button">
              去注册
            </Button>
          </Link>
        </FormItem>
      </Form>
    </Card>
  )
}
export default Login
