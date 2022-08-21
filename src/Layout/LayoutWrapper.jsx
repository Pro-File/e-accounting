import React from "react";
import { Layout } from "antd";
import style from "./index.module.less";
import LayoutHeader from "./Header";
const { Header, Sider, Content, Footer } = Layout;

const LayoutWrapper = ({ children }) => {
  return (
    <div>
      <Layout className={style.content}>
        <Header className={style.header}>
          <LayoutHeader />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </div>
  );
};

export default LayoutWrapper;
