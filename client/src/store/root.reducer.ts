import { combineReducers } from 'redux';
import authReducer from './features/auth/auth.reducer';
import companyReducer from './features/company/company.reducer';
import employeeReducer from './features/employee/employee.reducer';
import userReducer from './features/user/user.reducer';

const reducers = combineReducers({
	auth: authReducer,
	user: userReducer,
	company: companyReducer,
	employee: employeeReducer,
});

export default reducers;


export type RootState = ReturnType<typeof reducers>;