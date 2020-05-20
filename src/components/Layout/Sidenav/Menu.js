import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon, Menu } from "antd";


import MenuRoute from "../../../constants/menuRoute";

class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    const urlToList = (url) => {
      if (url) {
        const urlList = url.split("/").filter((i) => i);
        return urlList.map(
          (urlItem, index) => `/${urlList.slice(0, index + 1).join("/")}`
        );
      }
    };
    const activeMenuKey = urlToList(props.location.pathname);
    this.state = {
      openKeys: activeMenuKey ? activeMenuKey : ["/dashboard"],
    };
  }

  getSubMenuOrItem = (item) => {
    const { location } = this.props;
    const segmentURL = window.location.pathname.split("/");
    const secondSegmentURL = "/" + segmentURL[1];
    const currentPathname =
      location && location.pathname ? location.pathname : "/";
    const lastSegmentURL = currentPathname.substr(
      currentPathname.lastIndexOf("/") + 1
    );

    return (
      <Menu.Item
        key={item.path}
        className={
          secondSegmentURL === item.path &&
          (lastSegmentURL === "edit" || lastSegmentURL === "detail")
            ? "ant-menu-item-selected"
            : ""
        }
      >
        <Link to={item.path} style={{ textDecoration: "none" }}>
          <Icon type={item.iconName} />
          <span className="nav-text">{item.menuName || item.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter((item) => item);
  };

  // Conversion router to menu.
  formatter = (data, parentPath = "") => {
    return data.map((item) => {
      const result = {
        ...item,
      };
      if (item.routes) {
        const children = this.formatter(
          item.routes,
          `${parentPath}${item.path}/`
        );
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    });
  };

  getMenuData() {
    return this.formatter(MenuRoute);
  }

  render() {
    const { collapsedNav, colorOption, location } = this.props;
    // const mode = collapsedNav ? 'vertical' : 'inline';
    const menuTheme =
      ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) >= 0
        ? "light"
        : "dark";
    const currentPathname =
      location && location.pathname ? location.pathname : "/";

    const menuProps = collapsedNav
      ? {}
      : {
          openKeys: this.state.openKeys,
        };

    return (
      <Menu
        style={{ background: "#281e3c", height: "92.2vh", overflowY: "auto" }}
        theme={menuTheme}
        mode="inline"
        inlineCollapsed={collapsedNav}
        {...menuProps}
        // onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
      >
        {this.getNavMenuItems(this.getMenuData())}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsedNav: state.layout.collapsedNav,
    colorOption: state.layout.colorOption,
    location: state.router.location,
  };
};

export default connect(mapStateToProps)(AppMenu);
