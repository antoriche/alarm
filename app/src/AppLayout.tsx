// @flow
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import logoOnly from "./assets/jetpacklogoonly.png";
import logoFull from "./assets/jetpackfulllogo.png";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        width={250}
        onCollapse={toggleCollapse}
        trigger={null}
        style={{
          zIndex: 5,
          position: "relative",
          boxShadow: "2px 0px 3px lightgrey",
        }}
      >
        <Link to="/">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 70,
            }}
          >
            <img
              src={collapsed ? logoOnly : logoFull}
              alt="jetpacklogofull"
              style={{
                maxWidth: "100%",
                maxHeight: 70,
                padding: 10,
                marginBottom: 24,
              }}
            />
          </div>
        </Link>
        <NavigationMenu collapsed={collapsed} currentPath={pathname} />
        <div style={{ position: "absolute", bottom: "0" }}>
          <a href="https://jetpack.ai" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
            <div style={{ fontSize: collapsed ? 11 : 16, textAlign: collapsed ? "center" : undefined }}>Made with ♥ by</div>
            <img
              style={collapsed ? { height: 40, margin: 20 } : { height: 35, margin: 12, marginLeft: 20 }}
              src={collapsed ? logoOnly : logoFull}
              alt="logo"
            />
          </a>
        </div>
      </Sider>
      <Layout>
        <HeaderMenu toggleCollapse={toggleCollapse} collapsed={collapsed} />
        <Content
          style={{
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
