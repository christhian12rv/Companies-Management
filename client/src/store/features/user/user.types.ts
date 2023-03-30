import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum UserActionsTypes {
	FIND_ALL_PENDING = 'USER_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'USER_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'USER_FIND_ALL_FAIL',
	
	REGISTER_PENDING = 'USER_REGISTER_PENDING',
	REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
	REGISTER_FAIL = 'USER_REGISTER_FAIL',

	UPDATE_PENDING = 'USER_UPDATE_PENDING',
	UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
	UPDATE_FAIL = 'USER_UPDATE_FAIL',
	
	CLEAR_REQUEST = 'USER_CLEAR_REQUEST',
}

export type UserAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type UserState = GlobalStateType;