import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { getAuth as getAuthAction } from '../../../store/features/auth/auth.actions';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import UserTypeEnum from '../../../types/enums/User/UserTypeEnum';

export const VerifyAdminAuth: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
	const { user, } = useTypedSelector((state) => state.auth);
	const [verified, setVerified] = useState(false);

	if (!token)
		return <Navigate to={RoutesEnum.LOGIN} />;

	useEffect(() => {
		dispatch(getAuthAction());
	}, []);

	useEffect(() => {
		setVerified(true);
	}, [user]);

	return verified ? (user?.type === UserTypeEnum.ADMIN ? <Outlet/> : <Navigate to={RoutesEnum.USER_LIST} />) : <></>;
};