import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum AuthActionsTypes {
	LOGIN_PENDING = 'AUTH_LOGIN_PENDING',
	LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
	LOGIN_FAIL = 'AUTH_LOGIN_FAIL',

	GET_AUTH_PENDING = 'AUTH_GET_AUTH_PENDING',
	GET_AUTH_SUCCESS = 'AUTH_GET_AUTH_SUCCESS',
	GET_AUTH_FAIL = 'AUTH_GET_AUTH_FAIL',

	TOGGLE_DARK_MODE = 'AUTH_TOGGLE_DARK_MODE',

	CLEAR_REQUEST = 'AUTH_CLEAR_REQUEST',
}

export type AuthAction = {
	payload?: {
		user?: UserType | null;
		darkMode?: 'dark' | 'light';
		request: RequestType;
	}
} & GlobalActionType;

export type AuthState = {
	user: UserType | null;
	darkMode: 'dark' | 'light';
} & GlobalStateType;