import { FaceRounded } from '@mui/icons-material';
import { Typography, styled } from '@mui/material';

export const UserIcon = styled(FaceRounded)(({ theme, }) => ({
	fontSize: '2em',
	color: theme.palette.grey[900],
	transition: 'all .15s',
}));

export const UserName = styled(Typography)(({ theme, }) => ({
	fontSize: '.95em',
	fontWeight: 'bold',
	color: theme.palette.grey[900],
	ml: 2,
	lineHeight: 1,
	transition: 'all .15s',
}));

export const UserType = styled(Typography)(() => ({
	alignSelf: 'flex-start',
	fontSize: '.8em',
	ml: 2,
	transition: 'all .25s',
}));