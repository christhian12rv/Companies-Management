import { Dispatch } from 'redux';
import AuthLoginType from '../../../types/Auth/AuthLoginType';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import { AuthAction, AuthActionsTypes } from './auth.types';

export const login = (login: AuthLoginType): (dispatch: Dispatch<AuthAction>) => Promise<void> => {
	return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
		dispatch({ type: AuthActionsTypes.LOGIN_PENDING, });

		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify(login),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			localStorage.setItem(LocalStorageEnum.AUTH_TOKEN, json.token);
			
			dispatch({
				type: AuthActionsTypes.LOGIN_SUCCESS,
				payload: {
					user: json.user,
					request: {
						success: true,
						status: response.status,
						message: json.message,
						errors: null,
					},
				},
			});
			return;
		}

		dispatch({
			type: AuthActionsTypes.LOGIN_FAIL,
			payload: {
				request: {
					success: false,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};

export const logout = (): void => {
	const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

	if (!token)
		return;

	localStorage.removeItem(LocalStorageEnum.AUTH_TOKEN);
};

export const getAuth = (): (dispatch: Dispatch<AuthAction>) => Promise<void> => {
	return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: AuthActionsTypes.GET_AUTH_PENDING, });

		const response = await fetch('/api/user/get-auth', {
			method: 'POST',
			body: JSON.stringify({ token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: AuthActionsTypes.GET_AUTH_SUCCESS,
				payload: {
					user: json.user,
					request: {
						success: true,
						status: response.status,
						message: json.message,
						errors: null,
					},
				},
			});
			return;
		}

		dispatch({
			type: AuthActionsTypes.GET_AUTH_FAIL,
			payload: {
				request: {
					success: false,
					status: response.status,
					message: json.message,
					errors: json.errors ?? null,
				},
			},
		});
	};
};

export const toggleDarkMode = (): (dispatch: Dispatch<AuthAction>) => Promise<void> => {
	return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
		dispatch({ type: AuthActionsTypes.TOGGLE_DARK_MODE, });
	};
};

export const clearRequest = (): (dispatch: Dispatch<AuthAction>) => Promise<void> => {
	return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
		dispatch({ type: AuthActionsTypes.CLEAR_REQUEST, });
	};
};