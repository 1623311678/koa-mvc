import React, { useEffect, useRef, useState } from "react"
import { post, get, uploadFile } from "@src/api/request"
import apiMap from "@src/api/apiMap"
import {
  Table,
  Card,
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  message,
  Spin
} from "antd"
interface ModalFormProps {
  open: boolean
  onCancel: () => void
}
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({
  form,
  open
}: {
  form: any
  open: boolean
}) => {
  const prevOpenRef = useRef<boolean>()
  useEffect(() => {
    prevOpenRef.current = open
  }, [open])
  const prevOpen = prevOpenRef.current

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields()
    }
  }, [form, prevOpen, open])
}
const btnStyle = {
  width: 80,
  marginBottom: 10
}
const ModalForm: React.FC<any> = ({ open, onCancel, getData, userId }) => {
  const [form] = Form.useForm()
  const [modalLoading, setModalLoading] = useState(false)
  const [detail, setDetail] = useState<any>({})
  // console.log('detail', detail)
  useEffect(() => {
    if (userId) {
      setModalLoading(true)
      post(apiMap.getUserDetail, {
        userId
      })
        .then((res: any) => {
          if (res.code === 200) {
            setDetail({ ...res.data })
          }
        })
        .finally(() => {
          setModalLoading(false)
        })
    }
  }, [])
  useResetFormOnCloseModal({
    form,
    open
  })

  const onOk = () => {
    form
      .validateFields()
      .then(async values => {
        setModalLoading(true)
        const { userName, phoneNumber, password } = values
        if (userId) {
          const res: any = await post(apiMap.updateUser, {
            userName,
            userId,
            phoneNumber,
            password
          }).finally(() => {
            setModalLoading(false)
          })
          if (res.code === 200) {
            if (res.data.userName) {
              message.success(`已成功用户信息！`)
              onCancel()
              getData()
            }
          }
        } else {
          const res: any = await post(apiMap.addUser, {
            userName,
            phoneNumber,
            password
          }).finally(() => {
            setModalLoading(false)
          })

          if (res.code === 200) {
            if (res.data.userName) {
              message.success(`已成功新增用户${res.data.userName}！`)
              onCancel()
              getData()
            }
          }
        }
      })
      .catch(error => {
        // console.log('error',error)
        message.error("按照页面提示修改之后，再保存")
      })
    //   form.submit();
  }
  useEffect(() => {
    form.setFieldsValue({
      userName: detail.userName,
      phoneNumber: detail.phoneNumber,
      password: detail.password
    })
  }, [detail])
  return (
    <Modal
      title={userId ? "更改用户信息" : "新建用户"}
      open={open}
      onOk={onOk}
      onCancel={onCancel}>
      <Spin spinning={modalLoading}>
        {console.log("detail", detail)}
        <Form form={form} name="userForm">
          <Form.Item
            {...formLayout}
            name="userName"
            label="用户名"
            rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            {...formLayout}
            name="password"
            label="密码"
            rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            {...formLayout}
            name="phoneNumber"
            label="手机号"
            rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
function UserList() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(10)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  console.log(list)
  const onFinish = (values: any) => {
    // console.log("Success:", values)
    const { userName, phoneNumber } = values
    getData({
      userName,
      phoneNumber
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  const showUserModal = () => {
    setOpen(true)
  }

  const hideUserModal = () => {
    setOpen(false)
    setUserId(null)
  }
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      render: (val, record, index) => {
        return index + 1
      }
    },
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "手机号",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt"
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (val, record, index) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            type="primary"
            style={btnStyle}
            size="small"
            onClick={() => {
              setUserId(record.id)
              setTimeout(() => {
                showUserModal()
              }, 0)
            }}>
            编辑
          </Button>
          <Button
            type="primary"
            danger
            style={btnStyle}
            size="small"
            onClick={async () => {
              const res: any = await post(apiMap.deleteUser, {
                userId: record.id
              })
              if (res.code === 200) {
                message.success("删除成功")
                getData()
              }
            }}>
            删除
          </Button>
        </div>
      )
    }
  ]
  const getData = async (params: any = {}) => {
    setLoading(true)
    const { userName, phoneNumber, pageSize = 10, pageNumber = 1 } = params
    const res: any = await post(apiMap.getUserList, {
      pageSize,
      pageNumber,
      userName,
      phoneNumber
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
        setPageInfo({ pageSize, pageNumber })
      }, 300)
    })
    if (res.code === 200) {
      setList([...res.data.list])
      setTotal(res.data.total)
    }
    // console.log("res", res)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>用户配置管理</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item label="用户姓名" name="userName">
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              showUserModal()
            }}>
            新建
          </Button>
        </Form.Item>
      </Form>
      <Card style={{ marginTop: 20, width: "70vw", marginLeft: 20 }}>
        <div>
          <Table
            loading={loading}
            dataSource={list}
            columns={columns}
            rowKey={record => record.id}
            pagination={{
              total,
              showTotal: total => `共${total}条`,
              current: pageInfo.pageNumber,
              onChange: (page, pageSize) =>
                getData({
                  pageSize: pageSize,
                  pageNumber: page
                })
            }}></Table>
        </div>
      </Card>
      {open && (
        <ModalForm
          open={open}
          onCancel={hideUserModal}
          getData={getData}
          userId={userId}
        />
      )}
    </div>
  )
}
export default UserList
