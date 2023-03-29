import { RequestErrorType, RequestType } from '../types/global.store.types';

export default (request: RequestType | null, field: string): RequestErrorType | undefined => {
	console.log(request, field);
	return request?.errors?.find(error => error.field === field);
};