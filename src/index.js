import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import configureStore from "./store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { ConfigProvider } from "antd";

import "antd/dist/antd.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./components/Context/AuthContext";

// 3rd
import './styles/antd.less';
import './styles/bootstrap/bootstrap.scss';
// // custom
import './styles/layout.scss';
import './styles/theme.scss';
import './styles/ui.scss';
import './styles/vendors.scss';
import './styles/themes/normalize.css';

import "./index.css";
import App from "./containers/App";
import history from "./utils/history";
import * as serviceWorker from "./serviceWorker";

const mountNode = document.getElementById("root");
const store = configureStore({}, history);

ReactDOM.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ConfigProvider>
        </Router>
      </ConnectedRouter>
    </Provider>
  </Suspense>,
  mountNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
