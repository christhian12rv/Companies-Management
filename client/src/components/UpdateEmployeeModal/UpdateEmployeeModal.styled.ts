import { Dialog } from '@mui/material';
import { styled } from '@mui/system';

export const DialogStyled = styled(Dialog)(({ theme, }) => ({
	'& .MuiPaper-root': {
		borderRadius: '10px',
		width: '100%',
		padding: '1.5em',
	},
}));
