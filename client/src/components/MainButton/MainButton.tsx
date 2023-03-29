import { ButtonProps } from '@mui/material';
import React from 'react';
import { ButtonStyled } from './MainButton.styled';

export const MainButton: React.FunctionComponent<ButtonProps> = (props) => {
	return (
		<ButtonStyled onClick={props.onClick} sx={props.sx}>
			{props.children}
		</ButtonStyled>
	);
};