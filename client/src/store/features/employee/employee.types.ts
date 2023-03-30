import { GlobalActionType, GlobalStateType, RequestType } from '../../types/global.store.types';

export enum EmployeeActionsTypes {
	FIND_ALL_PENDING = 'EMPLOYEE_FIND_ALL_PENDING',
	FIND_ALL_SUCCESS = 'EMPLOYEE_FIND_ALL_SUCCESS',
	FIND_ALL_FAIL = 'EMPLOYEE_FIND_ALL_FAIL',
	
	CREATE_PENDING = 'EMPLOYEE_CREATE_PENDING',
	CREATE_SUCCESS = 'EMPLOYEE_CREATE_SUCCESS',
	CREATE_FAIL = 'EMPLOYEE_CREATE_FAIL',

	UPDATE_PENDING = 'EMPLOYEE_UPDATE_PENDING',
	UPDATE_SUCCESS = 'EMPLOYEE_UPDATE_SUCCESS',
	UPDATE_FAIL = 'EMPLOYEE_UPDATE_FAIL',
	
	CLEAR_REQUEST = 'EMPLOYEE_CLEAR_REQUEST',
}

export type EmployeeAction = {
	payload?: {
		request: RequestType;
	}
} & GlobalActionType;

export type EmployeeState = GlobalStateType;