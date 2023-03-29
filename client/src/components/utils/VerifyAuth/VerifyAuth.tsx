import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import RoutesEnum from '../../../types/enums/RoutesEnum';

export const VerifyAuth: React.FunctionComponent = () => {
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

	if (!token)
		return <Navigate to={RoutesEnum.LOGIN} />;

	return <Outlet />;
};