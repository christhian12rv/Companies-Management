import { EmployeeAction, EmployeeActionsTypes, EmployeeState } from './employee.types';

const initialState: EmployeeState = {
	request: null,
	loading: false,
	previousType: null,
};

const employeeReducer = (state = initialState, action: EmployeeAction): EmployeeState => {
	switch (action.type) {
	case EmployeeActionsTypes.FIND_ALL_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case EmployeeActionsTypes.FIND_ALL_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case EmployeeActionsTypes.FIND_ALL_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case EmployeeActionsTypes.CREATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case EmployeeActionsTypes.CREATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case EmployeeActionsTypes.CREATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case EmployeeActionsTypes.UPDATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case EmployeeActionsTypes.UPDATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case EmployeeActionsTypes.UPDATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case EmployeeActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default employeeReducer;