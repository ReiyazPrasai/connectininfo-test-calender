import React, { Component } from 'react';
// Import custom components
import LoginForm from '../../components/Auth/LoginForm';

class LoginContainer extends Component {
  render() {
    return <LoginForm {...this.props} />;
  }
}

export default LoginContainer;
