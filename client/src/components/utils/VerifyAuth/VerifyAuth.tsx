import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { getAuth as getAuthAction } from '../../../store/features/auth/auth.actions';

export const VerifyAuth: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

	if (!token)
		return <Navigate to={RoutesEnum.LOGIN} />;

	useEffect(() => {
		dispatch(getAuthAction());
	}, []);

	return <Outlet />;
};