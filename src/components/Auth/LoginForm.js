import React, { useContext } from "react";
import { Button, Form, Icon, Input, Alert } from "antd";
import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import LogoImage from "../../assets/logo.png";

const FormItem = Form.Item;

const LoginForm = (props) => {
  const {
    loading,
    setErrorMessage,
    setLoading,
    login,
    errorMessage,
  } = useContext(AuthContext);
  const { getFieldDecorator, validateFields, getFieldError } = props.form;

  const handleLogin = (e) => {
    validateFields([`userId`, `password`], (err, values) => {
      if (!err) {
        login(values);
      }
    });
  };

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage(null);
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="login-form-wrapper">
      {errorMessage && (
        <Alert
          message={errorMessage}
          type={"warning"}
          style={{ marginBottom: "2%", textAlign: "center" }}
        />
      )}
      <div className="logo">
        <img src={LogoImage} alt="Logo" style={{ width: "100%", height: 90 }} />
      </div>
      <Form onSubmit={handleLogin}>
        <FormItem
          hasFeedback={loading}
          validateStatus={getFieldError("userId") ? "error" : "validating"}
        >
          {getFieldDecorator("userId", {
            rules: [{ required: true, message: "Please input your email" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Email"
              disabled={loading}
            />
          )}
        </FormItem>
        <FormItem
          hasFeedback={loading}
          validateStatus={getFieldError("password") ? "error" : "validating"}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
              disabled={loading}
            />
          )}
        </FormItem>
        <FormItem>
          <Link to={"/reset"} style={{ color: "white", marginRight: "2%" }}>
            Forgot password
          </Link>

          <Button
            size="large"
            type="primary"
            onClick={(e) => handleLogin(e)}
            //   className={"login-form-button"}
            loading={loading}
          >
            Login
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

const WrappedLoginForm = Form.create()(withRouter(LoginForm));

export default WrappedLoginForm;
