import UserType from '../../../types/User/UserType';
import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum AuthActionsTypes {
	LOGIN_PENDING = 'AUTH_LOGIN_PENDING',
	LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
	LOGIN_FAIL = 'AUTH_LOGIN_FAIL',

	CLEAR_REQUEST = 'AUTH_CLEAR_REQUEST',
}

export type AuthAction = {
	payload?: {
		user?: UserType | null;
		request: RequestType;
	}
} & GlobalActionType;

export type AuthState = {
	user: UserType | null;
} & GlobalStateType;