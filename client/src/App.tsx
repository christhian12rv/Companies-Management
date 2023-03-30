import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import global from './styles/global';
import { MainLayout } from './pages/layout/MainLayout';
import RoutesEnum from './types/enums/RoutesEnum';
import { AddUser } from './pages/AddUser';
import { SnackbarProviderCustom } from './components/SnackbarProvider';
import { Provider } from 'react-redux';
import store from './store';
import { Login } from './pages/Login';
import { ListUsers } from './pages/ListUsers';
import { VerifyAuth } from './components/utils/VerifyAuth/VerifyAuth';
import { AddCompany } from './pages/AddCompany/AddCompany';
import { ListCompanies } from './pages/ListCompanies';
import { ThemeProviderCustom } from './components/ThemeProviderCustom';
import { VerifyAdminAuth } from './components/utils/VerifyAdminAuth/VerifyAdminAuth';
import { AddEmployee } from './pages/AddEmployee/AddEmployee';

export const App: React.FunctionComponent = () => {
	
	return (
		<Provider store={store}>
			<ThemeProviderCustom>
				<GlobalStyles styles={global} />
				<SnackbarProviderCustom />
				<BrowserRouter>
					<Routes>
						<Route element={<VerifyAuth />}>
							<Route element={<MainLayout />} >
								<Route path={RoutesEnum.USER_LIST} element={<ListUsers />} />
								<Route path={RoutesEnum.COMPANY_CREATE} element={<AddCompany />} />
								<Route path={RoutesEnum.COMPANY_LIST} element={<ListCompanies />} />
								<Route path={RoutesEnum.EMPLOYEE_CREATE} element={<AddEmployee />} />

								<Route element={<VerifyAdminAuth />}>
									<Route path={RoutesEnum.USER_REGISTER} element={<AddUser />} />
								</Route>
							</Route>
						</Route>

						<Route path={RoutesEnum.LOGIN} element={<Login />} />
					</Routes>
				</BrowserRouter>
			</ThemeProviderCustom>
		</Provider>
	);
};