import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  Row,
  Col,
  Icon,
  Menu,
  Input,
  Button,
  Layout,
  Avatar,
  Dropdown,
} from "antd";

import Logo from "../../../assets/logo.png";
import AvatarIcon from "../../../assets/user.png";
import searchIcon from "../../../assets/search.png";
import { AuthContext } from "../../Context/AuthContext";
import { getLocalStorage } from "../../../utils/storageUtil";
import {
  toggleCollapsedNav,
  showBookingModel,
} from "../../../actions/layoutActions";

const { Header } = Layout;

const AppHeader = (props) => {
  const { logout } = useContext(AuthContext);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const {
    innerWidth,
    collapsedNav,
    handleToggleCollapsedNav,
    handleShowBookingModel,
  } = props;

  const onToggleCollapsedNav = () => {
    handleToggleCollapsedNav(!collapsedNav);
  };

  const onShowBookingModel = () => {
    handleShowBookingModel(true);
  };

  const toggleDrawer = () => {
    innerWidth < 490 && setIsDrawerVisible(!isDrawerVisible);
  };

  const searchInputPrefix = () => {
    return (
      <img
        src={searchIcon}
        onClick={() => {
          toggleDrawer();
        }}
        alt="search"
        style={{ height: 15 }}
      />
    );
  };

  const notificationDropDown = (
    <Menu>
      <Menu.Item key="1">No Notifications </Menu.Item>
    </Menu>
  );

  const avatarDropdownItems = (
    <>
      <Menu.Item key="1">
        <Link style={{ textAlign: "center" }} to={`/profile`}>
          <div className="header-anticon" style={{ marginTop: "8px" }}>
            <Icon type="profile" /> Profile
          </div>
        </Link>{" "}
      </Menu.Item>
      <div
        style={{
          height: "1px",
          borderTop: "1px solid #e8e8e8",
          margin: "8px 0 5px",
        }}
      />
      <Menu.Item style={{ textAlign: "center" }} key="3">
        {" "}
        <Button
          type="link"
          style={{ textAlign: "center" }}
          onClick={() => {
            logout();
          }}
        >
          <div className="header-anticon">
            <Icon style={{}} type="logout" /> Log Out
          </div>
        </Button>
      </Menu.Item>
    </>
  );

  const avatarDropdown = <Menu>{avatarDropdownItems}</Menu>;

  const headerDropdown = (
    <>
      <Dropdown
        className="list-inline-item"
        overlay={avatarDropdown}
        trigger={["click"]}
        placement="bottomRight"
      >
        <span style={{ cursor: "pointer" }}>
          <Avatar
            style={{
              background: "#55c779",
              padding: "7px",
              marginRight: "10px",
            }}
            src={AvatarIcon}
          />
          <span
            className="avatar-text d-none d-md-inline"
            style={{ color: "white" }}
          >
            {getLocalStorage("user")}
          </span>
        </span>
      </Dropdown>
    </>
  );

  const headerItems = (
    <>
      <Button
        style={{
          marginRight: "15px",
          backgroundColor: "#55c779",
          color: "white",
        }}
        onClick={() => onShowBookingModel()}
      >
        + New Booking
      </Button>
      <Dropdown
        className="list-inline-item"
        overlay={notificationDropDown}
        trigger={["click"]}
        placement="bottomCenter"
      >
        <Icon
          type="bell"
          style={{
            width: 20,
            marginBottom: "5px",
            height: 20,
            marginRight: "10px",
            color: "#55C779",
          }}
        />
      </Dropdown>
    </>
  );

  const headerItemDropdown = () => (
    <Menu>
      <Menu.Item style={{ width: "auto" }} key="1">
        <div className="header-anticon">{headerItems}</div>
      </Menu.Item>
      <Menu.Divider />
      {avatarDropdownItems}
    </Menu>
  );

  const getHeaderItems = () => {
    return (
      <>
        {innerWidth < 768 ? (
          <div style={{ float: "right" }}>
            <Dropdown
              className="list-inline-item"
              overlay={headerItemDropdown}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                className="header-menu-icon"
                style={{ cursor: "pointer", color: "#fff" }}
              >
                <Avatar
                  style={{
                    background: "#55c779",
                    marginRight: "10px",
                  }}
                >
                  {
                    <span style={{ fontSize: "large" }}>
                      {getLocalStorage("user").slice(0, 1).toUpperCase()}
                    </span>
                  }
                </Avatar>
              </div>
            </Dropdown>
          </div>
        ) : (
          <div style={{ float: "right" }}>
            {headerItems}
            {headerDropdown}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Header
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          marginBottom: "20px",
          height: 51,
        }}
        className="header custom-app-header header-search no-focus no-hover"
      >
        <div>
          <Row>
            <Col
              xl={{ span: 14 }}
              lg={{ span: 14 }}
              md={{ span: 14 }}
              sm={{ span: 18 }}
              xs={{ span: 18 }}
            >
              <Button
                style={{ marginLeft: !collapsedNav ? 8 : 18 }}
                type="link"
                onClick={onToggleCollapsedNav}
              >
                <Icon
                  style={{ color: "#fff" }}
                  type={collapsedNav ? "menu-unfold" : "menu-fold"}
                  className="list-icon"
                />
              </Button>{" "}
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: innerWidth > 324 ? 150 : 90,
                  marginBottom: "5px",
                  height: innerWidth > 324 ? 40 : 35,
                  marginRight: "20px",
                }}
              />
              {innerWidth > 515 ? (
                <Input
                  className={"no-focus"}
                  style={{ width: 140 }}
                  prefix={searchInputPrefix()}
                  placeholder={"Search"}
                  onPressEnter={(e) => {
                    console.log(e.target.value);
                  }}
                  type="text"
                />
              ) : (
                innerWidth > 344 && searchInputPrefix()
              )}
            </Col>
            <Col
              xl={{ span: 10 }}
              lg={{ span: 10 }}
              md={{ span: 10 }}
              sm={{ span: 6 }}
              xs={{ span: 6 }}
            >
              <div className={"button-hover"} style={{ float: "right" }}>
                {getHeaderItems()}
              </div>
            </Col>
          </Row>
        </div>
      </Header>
      {isDrawerVisible && innerWidth <= 515 && innerWidth >= 344 && (
        <div
          className=" header-search no-focus no-hover"
          style={{
            position: "absolute",
            top: "53px",
            left: "23%",
            paddingTop: 5,
            zIndex: 900,
            width: 250,
            height: 40,
            background: "#281E3C",
          }}
        >
          <Input
            className={"no-focus"}
            style={{ width: 140 }}
            prefix={searchInputPrefix()}
            placeholder={"Search"}
            onPressEnter={(e) => {
              console.log(e.target.value);
            }}
            type="text"
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  collapsedNav: state.layout.collapsedNav,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch(toggleCollapsedNav(isCollapsedNav));
  },
  handleShowBookingModel: (isShown) => {
    dispatch(showBookingModel(isShown));
  },

  actions: bindActionCreators(Object.assign({}), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
