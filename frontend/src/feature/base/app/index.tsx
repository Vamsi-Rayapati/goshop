import { ConfigProvider, theme } from 'antd'
import React, { useEffect } from 'react'
import { RouterProvider, useNavigate } from 'react-router-dom'
import router from '../router'

function App() {
  return (
    <ConfigProvider
    theme={{
      // algorithm: theme.darkAlgorithm,
      token: {
        // Seed Token
        // colorPrimary: '#00b96b'
      }
    }}>
      <RouterProvider  router={router} />
    </ConfigProvider>
  )
}

export default App