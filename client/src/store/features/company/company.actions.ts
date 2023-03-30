import { Dispatch } from 'redux';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import CompanyRegisterType from '../../../types/Company/CompanyRegisterType';
import { CompanyAction, CompanyActionsTypes } from './company.types';
import CompanyUpdateType from '../../../types/Company/CompanyUpdateType';

export const findAll = async (): Promise<[Response, any]> => {
	const response = await fetch('/api/company');
	const json = await response.json();
	
	return [response, json];
};

export const create = (company: CompanyRegisterType): (dispatch: Dispatch<CompanyAction>) => Promise<void> => {
	return async (dispatch: Dispatch<CompanyAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: CompanyActionsTypes.CREATE_PENDING, });

		const response = await fetch('/api/company', {
			method: 'POST',
			body: JSON.stringify({ ...company, token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: CompanyActionsTypes.CREATE_SUCCESS,
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
			type: CompanyActionsTypes.CREATE_FAIL,
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

export const update = (company: CompanyUpdateType): (dispatch: Dispatch<CompanyAction>) => Promise<void> => {
	return async (dispatch: Dispatch<CompanyAction>): Promise<void> => {
		const token = localStorage.getItem(LocalStorageEnum.AUTH_TOKEN);

		if (!token)
			return;

		dispatch({ type: CompanyActionsTypes.UPDATE_PENDING, });

		const response = await fetch(`/api/company/${company.id}`, {
			method: 'PUT',
			body: JSON.stringify({ ...company, token, }),
		});
		const json = await response.json();
	
		if (response.status === 200) {
			dispatch({
				type: CompanyActionsTypes.UPDATE_SUCCESS,
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
			type: CompanyActionsTypes.UPDATE_FAIL,
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

export const clearRequest = (): (dispatch: Dispatch<CompanyAction>) => Promise<void> => {
	return async (dispatch: Dispatch<CompanyAction>): Promise<void> => {
		dispatch({ type: CompanyActionsTypes.CLEAR_REQUEST, });
	};
};