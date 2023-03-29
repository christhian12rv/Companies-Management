import { MUIStyledCommonProps } from '@mui/system';
import React from 'react';
import { LinkProps } from 'react-router-dom';
import { LinkStyled } from './LinkUnstyled.styled';

type LinkUnstyledProps = LinkProps & MUIStyledCommonProps;

export const LinkUnstyled: React.FunctionComponent<LinkUnstyledProps> = (props) => {
	return (
		<LinkStyled {...props}>
			{props.children}
		</LinkStyled>
	);
};