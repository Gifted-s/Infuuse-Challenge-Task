import React from 'react'
import { Menu, Button } from 'antd';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
  FileAddFilled,
  FileImageOutlined,
 
} from '@ant-design/icons';
import { AppContextProvider } from '../../context/AppContext/AppContext';

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    collapsed: window.screen.width <= 768 ? true : false,
    display: window.screen.width <= 768 ? false : true
  };
  static contextType = AppContextProvider

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    if (window.screen.width <= 768) {
      this.setState({ display: this.state.display ? false : true })
    }
  };

  render() {
    const { user } = this.context
    let index = 0;
    switch (this.props.location.pathname) {
      case '/dashboard':
        index = 1
        break;
      case '/dashboard/reports':
        index = 2
        break;
     
      default:
        index = 3;
    }

    const logout = () => {
      swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            await this.context.signOut()
            window.location = '/'
          } 
        });
    }
    return (
      <div style={{ width: this.state.display === false && window.screen.width <= 768 ? 0 : 256 }} >
        {window.screen.width <= 768 &&
          <Button type="primary" className="menu_btn" onClick={this.toggleCollapsed} style={{ marginBottom: 10, fontSize: '17px', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: '13px' }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
        }
        <Menu
          selectedKeys={[index.toString()]}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          className="sidebar"
          style={{ display: this.state.display === false && window.screen.width <= 768 ? 'none' : 'block' }}
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <div>
            <h3 className="text-light dd">Dashboard</h3>
          </div>
          <Menu.Item onClick={() => this.props.history.push({ pathname: '/dashboard', state: user })} key="1" icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub2" icon={<FileAddFilled />} title="Reports">
            <Menu.Item onClick={() => this.props.history.push({ pathname: '/dashboard/reports', state: user })} key="2"><FileImageOutlined />Images</Menu.Item>
          </SubMenu>
          <Menu.Item onClick={() => logout()} key="3" icon={<LogoutOutlined />}>
            Signout
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

export default withRouter(Sider)