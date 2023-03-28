import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import theme from './styles/theme';
import global from './styles/global';
import { MainLayout } from './pages/layout/MainLayout';

export const App: React.FunctionComponent = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles styles={global} />
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />} >

					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};