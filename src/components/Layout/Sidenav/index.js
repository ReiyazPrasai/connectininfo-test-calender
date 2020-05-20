import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

import { toggleCollapsedNav } from "../../../actions/layoutActions";
import AppMenu from "./Menu";

const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const { collapsedNav, offCanvasNav, sidenavWidth } = this.props;

    return (
      <>
        <Sider
          collapsible
          collapsed={collapsedNav || offCanvasNav}
          collapsedWidth={0}
          trigger={null}
          width={sidenavWidth}
          id="app-sidenav"
        >
          <div ref="sidenavContent">
            <AppMenu />
          </div>
        </Sider>
      </>
    );
  }
}

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
