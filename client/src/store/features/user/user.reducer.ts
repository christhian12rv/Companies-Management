import { UserAction, UserActionsTypes, UserState } from './user.types';

const initialState: UserState = {
	request: null,
	loading: false,
	previousType: null,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
	console.log('ACTION', action);
	switch (action.type) {
	case UserActionsTypes.REGISTER_PENDING: {
		return { ...state, ...action.payload, previousType: action.type, loading: true, };
	}
	case UserActionsTypes.REGISTER_SUCCESS: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}
	case UserActionsTypes.REGISTER_FAIL: {
		return { ...state, ...action.payload, previousType: action.type, loading: false, };
	}


	case UserActionsTypes.CLEAR_REQUEST: {
		return { ...state, request: null, loading: false, previousType: action.type, };
	}
	default:
		return state;
	}
};

export default userReducer;