import { CompanyState, CompanyAction, CompanyActionsTypes } from './company.types';

const initialState: CompanyState = {
	request: null,
	loading: false,
	previousType: null,
};

const companyReducer = (state = initialState, action: CompanyAction): CompanyState => {
	switch (action.type) {
	case CompanyActionsTypes.FIND_ALL_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case CompanyActionsTypes.FIND_ALL_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case CompanyActionsTypes.FIND_ALL_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case CompanyActionsTypes.CREATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case CompanyActionsTypes.CREATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case CompanyActionsTypes.CREATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case CompanyActionsTypes.UPDATE_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case CompanyActionsTypes.UPDATE_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case CompanyActionsTypes.UPDATE_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case CompanyActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default companyReducer;