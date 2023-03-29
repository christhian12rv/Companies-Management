import SelectType from './SelectType';

interface InputType {
	name: string;
	type: string;
	label: string;
	select?: SelectType[];
	password?: boolean;
}

export default InputType;