import { combineReducers } from 'redux';
import authReducer from './features/auth/auth.reducer';
import userReducer from './features/user/user.reducer';

const reducers = combineReducers({
	user: userReducer,
	auth: authReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;