import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum CompanyActionsTypes {
	FIND_ALL_PENDING = 'COMPANY_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'COMPANY_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'COMPANY_FIND_ALL_FAIL',
	
	CREATE_PENDING = 'COMPANY_CREATE_PENDING',
	CREATE_SUCCESS = 'COMPANY_CREATE_SUCCESS',
	CREATE_FAIL = 'COMPANY_CREATE_FAIL',

	UPDATE_PENDING = 'COMPANY_UPDATE_PENDING',
	UPDATE_SUCCESS = 'COMPANY_UPDATE_SUCCESS',
	UPDATE_FAIL = 'COMPANY_UPDATE_FAIL',
	
	CLEAR_REQUEST = 'COMPANY_CLEAR_REQUEST',
}

export type CompanyAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type CompanyState = GlobalStateType;