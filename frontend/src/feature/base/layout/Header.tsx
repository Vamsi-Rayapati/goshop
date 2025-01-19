import { Avatar, Button, Card, Popover, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { handleLogout } from 'feature/auth/functions';
import { User } from 'feature/users/types';
import React from 'react'

interface IProps {
    user: User
}

function AppHeader({user}: IProps) {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <Header style={{ paddingRight: 5, background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
           
           <Popover content={
            <Button onClick={handleLogout}>Logout</Button>
            }>
           {user.firstName && <Avatar style={{ backgroundColor: '#f56a00', cursor:'pointer' }} size={'large'}>{user.firstName[0]}</Avatar>}
           </Popover>
                

            
            {/*  */}
        </Header>
    )
}

export default AppHeader;