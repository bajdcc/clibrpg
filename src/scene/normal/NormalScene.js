import React from "react";
import {connect} from "react-redux";
import {Layout} from 'antd';
import UIPlayerInfo from "./UIPlayerInfo";

const {Content} = Layout;

class NormalScene extends React.Component {

  render() {
    return (
      <div>
        <Layout>
          <Content style={{padding: "10px"}}>
            <UIPlayerInfo/>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {};
})(NormalScene);
