import React from "react"
import { Form, Checkbox, Input, Button, Card, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { updateUserInfo } from "@src/store/userInfoSlice"
import apiMap from "@src/api/apiMap"
import { post, get, uploadFile } from "@src/api/request"
import { Link, useHistory } from "react-router-dom"
const FormItem = Form.Item
const InputStyle = { width: "300px" }
const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async values => {
    const res: any = await post(apiMap.register, {
      userName: values["username"],
      password: values["password"],
      phoneNumber: values["phoneNumber"]
    })
    // console.log(res,res)
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
    <Card title="账号注册" style={{ width: "500px", margin: "20px auto" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          // remember: true,
          username: undefined,
          password: undefined,
          phoneNumber: undefined
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <FormItem
          name="username"
          label="账号"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          style={InputStyle}
          rules={[{ required: true, message: "用户名必填" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          style={InputStyle}
          rules={[{ required: true, message: "密码必填" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem
          name="phoneNumber"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          label="手机号"
          style={InputStyle}
          rules={[{ required: true, message: "手机号必填" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入手机号"
          />
        </FormItem>
        <FormItem style={{ marginLeft: 100 }}>
          <Link to="/login">
            <Button type="primary" className="login-form-button">
              去登录
            </Button>
          </Link>

          <Button
            type="primary"
            style={{ marginLeft: 20 }}
            htmlType="submit"
            // onClick={() => {
            //     // const values =
            //     // post(apiMap.register, {
            //     //     userName: 'wangjunkai03',
            //     //     password: 'wjkwjk'
            //     // })
            // }}
            className="login-form-button">
            注册
          </Button>
        </FormItem>
      </Form>
    </Card>
  )
}
export default Register
