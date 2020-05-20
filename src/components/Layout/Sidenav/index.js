import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

import { toggleCollapsedNav } from "../../../actions/layoutActions";
import AppMenu from "./Menu";

const { Sider } = Layout;

const AppSidenav = (props) => {
  const { collapsedNav, sidenavWidth, innerWidth } = props;
  
  return (
    <Sider
      collapsible
      collapsed={collapsedNav}
      collapsedWidth={innerWidth > 570 ? 80 : 0}
      trigger={null}
      width={innerWidth < 570 ? 65 : sidenavWidth}
      id="app-sidenav"
    >
      <div style={{ height: "100%" }}>
        <AppMenu {...props} />
      </div>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  collapsedNav: state.layout.collapsedNav,
  offCanvasNav: state.layout.offCanvasNav,
  sidenavWidth: state.layout.sidenavWidth,
  colorOption: state.layout.colorOption,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleCollapsedNav: (isCollapsedNav) => {
      dispatch(toggleCollapsedNav(isCollapsedNav));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSidenav);
