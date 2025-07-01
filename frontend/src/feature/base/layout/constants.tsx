import { MenuProps } from "antd";
import { ROUTE } from "../router/constants";
import {
  ProductOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
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
    // {
    //   label: 'Orders',
    //   key: ROUTE.ORDERS,
    //   icon: <PieChartOutlined />
    // },
    {
      label: 'Products',
      key: ROUTE.PRODUCTS,
      icon: <ProductOutlined />
    }
  ];