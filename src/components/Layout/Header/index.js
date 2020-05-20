import React, { useContext } from "react";
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
import bellIcon from "../../../assets/notification.png";
import { AuthContext } from "../../Context/AuthContext";
import { getLocalStorage } from "../../../utils/storageUtil";
import {
  toggleCollapsedNav,
  showBookingModel,
} from "../../../actions/layoutActions";

const { Header } = Layout;

const AppHeader = (props) => {
  const { logout } = useContext(AuthContext);
  const {
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

  const searchInputPrefix = () => {
    return <img src={searchIcon} alt="search" style={{ height: 15 }} />;
  };

  const avatarDropdown = (
    <Menu>
      <Menu.Item key="1">
        <Link style={{ textAlign: "center" }} to={`/profile`}>
          <div className="header-anticon">
            <Icon type="profile" /> Profile
          </div>
        </Link>{" "}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
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
    </Menu>
  );

  return (
    <Header className="custom-app-header header-search no-focus no-hover">
      <div className={"app-header-inner"}>
        <div className="header-left">
          <Row>
            <Col>
              <Button type="link" onClick={onToggleCollapsedNav}>
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
                  width: "20%",
                  marginBottom: "5px",
                  height: 40,
                  marginRight: "3%",
                }}
              />
              <Input
                className={"no-focus"}
                style={{ width: "30%" }}
                prefix={searchInputPrefix()}
                placeholder={"Search"}
                onPressEnter={(e) => {
                  console.log(e.target.value);
                }}
                type="text"
              />
            </Col>
          </Row>
        </div>
        <div className="header-right button-hover">
          <Row>
            <Col>
              <Button
                style={{
                  marginRight: "8%",
                  backgroundColor: "#55c779",
                  color: "white",
                }}
                onClick={() => onShowBookingModel()}
              >
                + New Booking
              </Button>
              <img
                src={bellIcon}
                alt="bellIcon"
                style={{
                  width: 20,
                  marginBottom: "5px",
                  height: 20,
                  marginRight: "3%",
                }}
              />
              <Dropdown
                className="list-inline-item"
                overlay={avatarDropdown}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span style={{ cursor: "pointer" }}>
                  <Avatar
                    style={{ background: "#55c779", padding: "7px" }}
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
            </Col>
          </Row>
        </div>
      </div>
    </Header>
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
