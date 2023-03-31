import { ButtonProps } from '@mui/material';
import React from 'react';
import { ButtonStyled } from './MainButton.styled';

export const MainButton: React.FunctionComponent<ButtonProps> = ({ children, type, onClick, sx, }) => {
	return (
		<ButtonStyled type={type} onClick={onClick} sx={sx}>
			{children}
		</ButtonStyled>
	);
};