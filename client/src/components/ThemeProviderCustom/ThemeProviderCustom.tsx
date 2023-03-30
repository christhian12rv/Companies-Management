import { ThemeProvider, ThemeProviderProps } from '@emotion/react';
import React from 'react';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import theme from '../../styles/theme';
import themeDark from '../../styles/themeDark';

type ThemeProviderCustomProps = {
	children: any;
};

export const ThemeProviderCustom: React.FunctionComponent<ThemeProviderCustomProps> = ({ children, }) => {
	const { darkMode, } = useTypedSelector((state) => state.auth);
	
	return (
		<ThemeProvider theme={darkMode === 'dark' ? themeDark : theme}>
			{children}
		</ThemeProvider>
	);
};