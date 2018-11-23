import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store/store";
import {Provider} from "react-redux";
import {Layout} from "antd";
const {Content} = Layout;

/* Absolute root of the app */
class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Layout>
          <Content>
            <App/>
          </Content>
        </Layout>
      </Provider>
    );
  }
}

ReactDOM.render(
  <RootComponent store={store}/>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
