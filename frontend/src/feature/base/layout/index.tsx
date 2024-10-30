import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { ROUTE } from '../router/constants';
import AppHeader from './Header';
import useFetch from '../hooks/useFetch';
import { User } from 'feature/users/types';
import { USERS_API } from 'feature/users/constants';
import { parseJWT } from 'feature/auth/functions';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  {
    label: 'Profile',
    key: ROUTE.PROFILE,
    icon:  <UserOutlined />
  },
  {
    label: 'Users',
    key: ROUTE.USERS,
    icon: <TeamOutlined/>
  },
  {
    label: 'Orders',
    key: ROUTE.ORDERS,
    icon: <PieChartOutlined />
  }
];

const MainLayout: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [getUserRes, getUserReq] = useFetch<User>();


  useEffect(()=> {
    const user = parseJWT();
    getUserReq({
      url: `${USERS_API}/${user?.id}`,
      method: 'GET',
    })
    .then(res=> {
      if(res.isSuccess) {
        navigate(ROUTE.USERS)
      }
    })
  },[]);

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key)
    
  };
  useEffect(()=> {
    window.navigate = navigate;
  },[])

  if(getUserRes.isLoading) return (
    <div style={{height: '100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Spin/>
    </div>
  )
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} onClick={onClick} mode="inline" items={items} />
      </Sider>
      <Layout>
       <AppHeader/>
        <Content style={{ margin: '0 16px' }}>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;