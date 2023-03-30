import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { getAuth as getAuthAction } from '../../../store/features/auth/auth.actions';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import { AuthActionsTypes } from '../../../store/features/auth/auth.types';

export const VerifyAuth: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);
	const { user, previousType, } = useTypedSelector(state => state.auth);
	const [verified, setVerified] = useState(false);

	if (!token)
		return <Navigate to={RoutesEnum.LOGIN} />;

	useEffect(() => {
		dispatch(getAuthAction());
	}, []);

	useEffect(() => {
		if (previousType === AuthActionsTypes.GET_AUTH_SUCCESS || previousType === AuthActionsTypes.GET_AUTH_FAIL)
			setVerified(true);
	}, [previousType]);

	return verified ? (user ? <Outlet/> : <Navigate to={RoutesEnum.LOGIN} />) : <></>;
};