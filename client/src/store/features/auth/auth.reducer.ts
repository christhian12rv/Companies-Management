import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import { AuthAction, AuthActionsTypes, AuthState } from './auth.types';

const initialState: AuthState = {
	user: null,
	darkMode: localStorage.getItem(LocalStorageEnum.DARK_MODE) === 'dark' ? 'dark' : 'light',
	request: null,
	loading: false,
	previousType: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
	case AuthActionsTypes.LOGIN_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case AuthActionsTypes.LOGIN_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case AuthActionsTypes.LOGIN_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case AuthActionsTypes.GET_AUTH_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case AuthActionsTypes.GET_AUTH_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case AuthActionsTypes.GET_AUTH_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}

	case AuthActionsTypes.TOGGLE_DARK_MODE: {
		localStorage.setItem(LocalStorageEnum.DARK_MODE, state.darkMode === 'dark' ? 'light' : 'dark');
		return { ...state, darkMode: state.darkMode === 'dark' ? 'light' : 'dark', };
	}

	case AuthActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default authReducer;