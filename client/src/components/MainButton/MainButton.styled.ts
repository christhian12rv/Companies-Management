import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const ButtonStyled = styled(Button)(({ theme, }) => ({
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.common.white,
	fontWeight: 'bold',
	textDecoration: 'none !important',
	'&:hover': {
		backgroundColor: theme.palette.primary.main,
	},
	transition: '.25s all',
}));
