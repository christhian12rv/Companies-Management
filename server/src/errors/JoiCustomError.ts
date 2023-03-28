class JoiCustomError {
	private error: {
		message: string;
		field: string;
	};
	
	constructor(message, field) {
		this.error = {
			message,
			field,
		};
	}
}

export default JoiCustomError;