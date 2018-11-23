import React from "react";
import {Modal, Button, Alert, Input, Icon, message} from "antd";
import audioManager from "../../audio/manager";

class IntroInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      visible: false,
      confirmLoading: false,
      errMsg: '',
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.showModal();
    }, 100);
  }

  emitEmpty() {
    this.input.focus();
    this.setState({text: ''});
  }

  onChangeUserName(e) {
    this.setState({text: e.target.value});
  }

  showModal() {
    audioManager.playSfx("sfx_ring");
    this.setState({
      visible: true,
    });
  }

  handleNameSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    //Wait a second for effect, then proceed
    setTimeout(() => {
      this.props.onNameReceived(this.state.text);
    }, 100);
  }

  handleOk() {
    const {text} = this.state;
    if (text === '') {
      message.error('请重新输入');
      this.setState({
        errMsg: '名字不能为空',
      });
      return;
    }
    if (text.length > 10) {
      message.error('请重新输入');
      this.setState({
        errMsg: '名字不能超过10个字符',
      });
      return;
    }
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      message.success('输入成功！');
      this.handleNameSubmit.call(this);
    }, 500);
  }

  render() {
    const {visible, confirmLoading, text, errMsg} = this.state;
    const suffix = text ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)}/> : null;
    return (
      <div>
        <Modal title="输入名字"
               visible={visible}
               confirmLoading={confirmLoading}
               footer={[
                 <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk.bind(this)}>
                   确定
                 </Button>
               ]}
        >
          {
            errMsg !== '' ? (
              <p>
                <Alert message={errMsg} type="error" showIcon/>
              </p>
            ) : null
          }
          <p>
            <Input
              placeholder="输入名字"
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              suffix={suffix}
              value={text}
              onChange={this.onChangeUserName.bind(this)}
              ref={node => this.input = node}
            />
          </p>
        </Modal>
      </div>
    );
  }
}

export default IntroInput;
