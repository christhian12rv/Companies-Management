import { ThemeProvider, ThemeProviderProps } from '@emotion/react';
import React from 'react';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import theme from '../../styles/theme';
import themeDark from '../../styles/themeDark';

export const ThemeProviderCustom: React.FunctionComponent<ThemeProviderProps> = (props) => {
	const { darkMode, } = useTypedSelector((state) => state.auth);
	
	return (
		<ThemeProvider theme={darkMode === 'dark' ? themeDark : theme}>
			{props.children}
		</ThemeProvider>
	);
};