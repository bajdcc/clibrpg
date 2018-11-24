import React from "react";
import {connect} from "react-redux";
import {Layout, Row} from 'antd';
import UIPlayerInfo from "./UIPlayerInfo";
import UIMapInfo from "./UIMapInfo";

const {Content} = Layout;

class NormalScene extends React.Component {

  render() {
    return (
      <div>
        <Layout>
          <Content style={{padding: "10px"}}>
            <Row>
              <UIPlayerInfo/>
              <UIMapInfo/>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {};
})(NormalScene);
