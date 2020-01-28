import React from "react"
import { Layout, Menu } from "antd"
import { Route, Link } from "react-router-dom"
import Feed from "../../containers/Feed/Feed"
import AuthorPage from "../../containers/AuthorPage/AuthorPage"

import ModalWindow from "../../containers/Modal/Modal"
import "./HomePage.css"

const { Header, Content, Footer } = Layout

const HomePage = () => {
  return (
    <Layout className="layout">
      <Header>
        {/* <div className='logo' /> */}
        <ModalWindow />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="feed">
            <Link to="/">Feed</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Route exact path="/" component={Feed} />
          <Route exact path="/author/:id" component={AuthorPage} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Messanger 2020 Created by Vadim Burukin
      </Footer>
    </Layout>
  )
}

export default HomePage
