import React, { useLayoutEffect, useState } from "react";
import { Layout, Card } from "antd";

import AppHeader from "./Header";
import AppSidenav from "./Sidenav";
import NewBookingModel from "../Common/NewBookingModel";

const { Content } = Layout;
const { innerWidth } = window;

const AppLayout = (props) => {
  const [size, setSize] = useState([innerWidth, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      <AppHeader innerWidth={size[0]} />
      <Layout style={{ height: "100%" }}>
        <AppSidenav innerWidth={size[0]} />
        <Layout style={{ height: "100%" }}>
          <div
            className="ant-card-body-main-wrapper"
            style={{
              padding: "65px 15px 15px 15px",
              width: "100%",
              height: "100%",
            }}
          >
            <Card style={{ height: "auto", overflowY: "auto" }}>
              <Content>
                {props.children} {<NewBookingModel />}
              </Content>
            </Card>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout
