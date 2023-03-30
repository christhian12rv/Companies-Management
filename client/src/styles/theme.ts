import { createTheme } from '@mui/material';

interface InputColors {
	readOnly: string;
}

interface FormColors {
	input: InputColors;
}

interface CardShadows {
	main: string;
}

declare module '@mui/material/styles' {
	interface Palette {
    // link: Palette['primary'];
		form: FormColors;
  }
  interface PaletteOptions {
    // link?: PaletteOptions['primary'];
		form?: FormColors;
  }

  interface PaletteColor {
    darker: string;
		lighter: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
		lighter?: string;
  }

	interface CommonColors {
		dark: string;
		darker: string;
		light: string;
		lighter: string;
		green: string;
		greenDark: string;
		greenDarker: string;
	}


	interface Shadows {
		card: CardShadows;
	}
}

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#10B981',
			dark: '#059669',
			darker: '#047857',
			light: '#34D399',
			lighter: '#6EE7B7',
		},
		secondary: {
			main: '#0EA5E9',
			dark: '#0284C7',
		},
		common: {
			black: 'rgb(22, 22, 22)',
			dark: 'rgb(75, 75, 75)',
			white: 'rgb(250, 250, 250)',
			light: 'rgb(131, 131, 131)',
		},
		divider: 'rgba(0, 0, 0, 0.1)',
		form: {
			input: {
				readOnly: 'rgba(0, 0, 0, 0.05)',
			},
		},
	},
});

export default theme;

export const Theme = typeof theme;