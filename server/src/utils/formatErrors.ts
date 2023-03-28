const formatErrors = (errors): { message: string, field: string, }[] => {
	if (errors.details)
		return errors.details.map(e => ({ message: e.message, field: e.context.key, }));
	
	return [{ message: errors.error.message, field: errors.error.field, }];
};

export default formatErrors;