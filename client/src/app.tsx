import React, { FC, useEffect } from "react"
import { createRoot } from "react-dom/client"
import LayoutRouter from "@src/router"
import { BrowserRouter } from "react-router-dom"
import LayoutMenu from "./menu"
import LayoutHeader from "@src/components/Header"
import store from "./store"
import { Provider, useSelector } from "react-redux"
import Login from "./pages/Login"
import "./app.less"
const App: FC = () => {
  const token = useSelector((state: any) => {
    return state.userInfo.token
  })
  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      window.location.href = "/login"
    }
  }, [])
  return (
    <BrowserRouter>
      {token && <LayoutHeader />}
      <div style={{ display: "flex" }}>
        {token && <LayoutMenu />}
        <LayoutRouter></LayoutRouter>
      </div>
    </BrowserRouter>
  )
}
const rootDom = document.getElementById("root")
const root = createRoot(rootDom)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
