import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import EmployeeRegisterType from '../../../types/Employee/EmployeeRegisterType';
import { EmployeeAction, EmployeeActionsTypes } from './employee.types';
import EmployeeUpdateType from '../../../types/Employee/EmployeeUpdateType';

export const findAll = async (): Promise<[Response, any]> => {
	const response = await fetch('/api/employee');
	const json = await response.json();
	
	return [response, json];
};

export const create = (employee: EmployeeRegisterType): (dispatch: Dispatch<EmployeeAction>) => Promise<void> => {
	return async (dispatch: Dispatch<EmployeeAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: EmployeeActionsTypes.CREATE_PENDING, });

		const response = await fetch('/api/employee', {
			method: 'POST',
			body: JSON.stringify({ ...employee, token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: EmployeeActionsTypes.CREATE_SUCCESS,
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
			type: EmployeeActionsTypes.CREATE_FAIL,
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

export const update = (employee: EmployeeUpdateType): (dispatch: Dispatch<EmployeeAction>) => Promise<void> => {
	return async (dispatch: Dispatch<EmployeeAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: EmployeeActionsTypes.UPDATE_PENDING, });

		const response = await fetch(`/api/employee/${employee.id}`, {
			method: 'PUT',
			body: JSON.stringify({ ...employee, token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: EmployeeActionsTypes.UPDATE_SUCCESS,
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
			type: EmployeeActionsTypes.UPDATE_FAIL,
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

export const clearRequest = (): (dispatch: Dispatch<EmployeeAction>) => Promise<void> => {
	return async (dispatch: Dispatch<EmployeeAction>): Promise<void> => {
		dispatch({ type: EmployeeActionsTypes.CLEAR_REQUEST, });
	};
};