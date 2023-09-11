import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Accounts } from 'modules/accounts';

export const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="accounts/*" element={<Accounts />} />
          <Route index element={<Navigate to="accounts/" />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
};
