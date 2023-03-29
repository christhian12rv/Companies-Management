import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum UserActionsTypes {
	REGISTER_PENDING = 'USER_REGISTER_PENDING',
	REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
	REGISTER_FAIL = 'USER_REGISTER_FAIL',
	
	CLEAR_REQUEST = 'USER_CLEAR_REQUEST',
}

export type UserAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type UserState = GlobalStateType;