import React from "react";
import { Layout } from "antd";

import AppHeader from "./Header";
import AppSidenav from "./Sidenav";
import NewBookingModel from "../Common/NewBookingModel";

const AppLayout = (props) => {
  return (
    <Layout id="app-layout">
      <AppHeader />
      <Layout>
        <AppSidenav />
        <div style={{ padding: "10px", width: "100%", background:'#d9d9d9'}}>
          {props.children}
          {<NewBookingModel />}
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
