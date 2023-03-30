import { Dialog, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const Title = styled(Typography)(({ theme, }) => ({
	color: theme.palette.primary.dark,
}));

export const DialogStyled = styled(Dialog, { shouldForwardProp: (prop) => prop !== 'address', })(({ theme, }) => ({
	'& .MuiPaper-root': {
		borderRadius: '10px',
		width: '400px',
	},
}));
