import SelectType from './SelectType';

interface InputType {
	name: string;
	type: string;
	label: string;
	select?: SelectType[];
	password?: boolean;
	disabled?: boolean;
	onChange?: (event: any) => any;
}

export default InputType;