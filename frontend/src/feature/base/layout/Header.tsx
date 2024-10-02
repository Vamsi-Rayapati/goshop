import { Avatar, Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { handleLogout } from 'feature/auth/functions';
import React from 'react'

function AppHeader() {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>
    )
}

export default AppHeader;