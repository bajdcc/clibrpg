import React from "react";
import {connect} from "react-redux";
import {Layout, Row} from 'antd';
import UIPlayerInfo from "./UIPlayerInfo";
import UIMapInfo from "./UIMapInfo";
import UIGoodInfo from "./UIGoodInfo";
import UIFightInfo from "./UIFightInfo";

const {Content} = Layout;

class NormalScene extends React.Component {

  render() {
    return (
      <div>
        <Layout>
          <Content style={{padding: "10px"}}>
            <Row>
              <UIPlayerInfo/>
              {
                this.props.fightN ? <UIFightInfo/> : <UIMapInfo/>
              }
              <UIGoodInfo/>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    fightN: state.player.fightN,
  };
})(NormalScene);
