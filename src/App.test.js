import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <RootComponent store={store}/>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
});
