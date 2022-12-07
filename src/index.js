//js入口文件
import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Input, Modal, Form } from 'antd';
import 'antd/dist/reset.css';
import "./index.less"

const root = ReactDOM.createRoot(document.getElementById('root'));
//class组件
class Item extends React.Component {
  // 把 render() 方法中的 this.props.date 替换成 this.state.date
  //用作组件初始化或为事件处理函数绑定实例
  constructor(props) {
    super(props);
    // this.state = { date: 1 };
    //为了在回调中使用this,所以要绑定,handleClick方法使用箭头函数则不用绑定
    // this.handleClick = this.handleClick.bind(this)
  }
  handleClick = () => {
    this.setState((state) => ({
      date: state.date + 1
    }))
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="item" onClick={this.handleClick}>
        <div className="date">
          <div className="top"></div>
          <div className="bottom">{this.props.name}</div>
        </div>
        <div className="content">{this.props.content}
        </div>
      </div>
    )
  }
}

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  //组件挂载后
  componentDidMount() {
  }
  //组件更新后
  componentDidUpdate() {
  }
  //组件卸载或销毁前
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  showModal = () => {
    this.setState({
      isModalOpen: true
    })
  }
  handleOk = () => {
    this.setState({
      isModalOpen: false
    })
  }
  handleCancel = () => {
    this.setState({
      isModalOpen: false
    })
  }
  onFinish = () => { }
  onFinishFailed = () => { }
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          +新建
        </Button>
        <Modal title="新建" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input name={this.props.name} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input content={this.props.content} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}

class ListProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: undefined,
      numbers: [
        {
          name: "今天",
          content: "钓鱼"
        },
        {
          name: "上周",
          content: "钓鱼"
        },
        {
          name: "昨天",
          content: "钓鱼"
        },
        {
          name: "最近",
          content: "钓鱼"
        },
        {
          name: "去年",
          content: "跑步"
        },
      ],
      total: 0
    };
  }
  componentDidMount() {
    this.setState((state) => ({
      total: state.numbers.length
    }))
  }
  handleClick = () => {
    this.setState((state) => ({

    }))
  }

  //按下回车
  onPressEnter = () => {
  }
  render() {
    const items = this.state.numbers.map((p, index) => <Item content={p.content} name={p.name} key={index} />)
    return (
      <div >
        <Input placeholder="搜索" value={this.state.searchVal} onPressEnter={this.onPressEnter} />
        <div className="total"> total:{this.state.total}</div>
        <div className="warp">
          {items}
        </div>
        <FormModal />
      </div>
    )
  }
}
root.render(<ListProject />);

