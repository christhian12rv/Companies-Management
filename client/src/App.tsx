import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import theme from './styles/theme';
import global from './styles/global';
import { MainLayout } from './pages/layout/MainLayout';
import RoutesEnum from './types/enums/RoutesEnum';
import { AddUser } from './pages/AddUser';
import { SnackbarProviderCustom } from './components/SnackbarProvider';
import { Provider } from 'react-redux';
import store from './store';
import { Login } from './pages/Login';

export const App: React.FunctionComponent = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyles styles={global} />
				<SnackbarProviderCustom />
				<BrowserRouter>
					<Routes>
						<Route element={<MainLayout />} >
							<Route path={RoutesEnum.USER_REGISTER} element={<AddUser />} />
						</Route>

						<Route path={RoutesEnum.LOGIN} element={<Login />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};