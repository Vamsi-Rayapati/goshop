import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
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
);
