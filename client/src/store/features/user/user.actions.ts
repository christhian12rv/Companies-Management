import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import UserRegisterType from '../../../types/User/UserRegisterType';
import { UserAction, UserActionsTypes } from './user.types';

export const register = (user: UserRegisterType): (dispatch: Dispatch<UserAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UserAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: UserActionsTypes.REGISTER_PENDING, });

		const response = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ ...user, token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: UserActionsTypes.REGISTER_SUCCESS,
				payload: {
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
			type: UserActionsTypes.REGISTER_FAIL,
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

export const clearRequest = (): (dispatch: Dispatch<UserAction>) => Promise<void> => {
	return async (dispatch: Dispatch<UserAction>): Promise<void> => {
		dispatch({ type: UserActionsTypes.CLEAR_REQUEST, });
	};
};