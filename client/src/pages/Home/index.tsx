import React, { useEffect } from "react"
import { post, get, uploadFile } from "@src/api/request"
import apiMap from "@src/api/apiMap"

function Home() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const res: any = await post(apiMap.getUserList, {
  //       pageSize: 10,
  //       pageNumber: 1
  //     })
  //   }
  //   getData()
  // }, [])
  return (
    <div>
      <h2>主页</h2>
    </div>
  )
}
export default Home
