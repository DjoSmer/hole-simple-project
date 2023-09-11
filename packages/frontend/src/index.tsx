import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeWrapper } from '~/components/ThemeWrapper';
import { index } from '~/store';
import { App } from './App';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={index}>
    <ThemeWrapper>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeWrapper>
  </Provider>
);
