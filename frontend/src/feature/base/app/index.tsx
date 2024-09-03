import { ConfigProvider } from 'antd'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
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
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App