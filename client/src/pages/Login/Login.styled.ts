import { AccountCircle, AccountCircleRounded } from '@mui/icons-material';
import { Card, styled } from '@mui/material';

export const LoginCard = styled(Card)(() => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: '400px',
	minHeight: '350px',
	boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
	borderRadius: '10px',
	padding: '1em',
	overflow: 'inherit',
}));

export const LoginIcon = styled(AccountCircle)(({ theme, }) => ({
	position: 'absolute',
	top: 0,
	left: '50%',
	transform: 'translate(-50%, -50%)',
	fontSize: '5em',
	color: theme.palette.grey[500],
	backgroundColor: theme.palette.common.white,
	borderRadius: '50%',
}));