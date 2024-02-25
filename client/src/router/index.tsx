import React, { Fragment } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import Home from "@src/pages/Home"
import About from "@src/pages/About"
import Users from "@src/pages/Users"
import Users1 from "@src/pages/Users1"
import Users2 from "@src/pages/Users2"
import NotFound from "@src/pages/404"
import Login from "@src/pages/Login"
import Register from "@src/pages/Register"
import UserList from "@src/pages/UserList"
import AssetList from "@src/pages/Asset"

const routes = [
  { path: "/", compoment: Home },
  { path: "/home", compoment: Home },
  { path: "/user-list", compoment: UserList },
  { path: "/asset-list", compoment: AssetList },
  { path: "/404", compoment: NotFound },
  { path: "/login", compoment: Login },
  { path: "/register", compoment: Register },
  { path: "/about", compoment: About },
  { path: "/users", compoment: Users },
  { path: "/users/app1", compoment: Users1 },
  { path: "/users/app2", compoment: Users2 }
]
function AppRouter() {
  return (
    <Fragment>
      <Switch>
        {routes.map((item, index) => (
          <Route
            path={item.path}
            component={item.compoment}
            key={index}
            exact
          />
        ))}
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default AppRouter
