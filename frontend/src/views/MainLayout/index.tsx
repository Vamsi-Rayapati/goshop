import React from 'react';
import Icon, { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { FcFolder } from "react-icons/fc";
import { Outlet } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = [
  {
    key:'compress',
    label:'Compress'
  },
  {
    key:'convert',
    label:'Convert'
  }
];

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function MainLayout() {

  return (
    <Layout style={{height:'100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center',gap:'1rem', paddingLeft:'1rem' }}>
        <FcFolder size={30}/>
        <span className='text-t2' style={{color:'white'}}>File Player</span>
        {/* <Link to={"/compress"}>Compress</Link> */}

        <Link>Compress</Link>
        <div style={{color:'white'}}>{true}</div>
      </Header>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Outlet/>
      </Layout>
      
    </Layout>
  );
};

export default MainLayout;