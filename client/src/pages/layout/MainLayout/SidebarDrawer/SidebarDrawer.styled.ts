import { Typography, ListItemButton, styled, ListItemButtonProps } from '@mui/material';

export const LogoTitle = styled(Typography)(({ theme, }) => ({
	color: theme.palette.grey[900],
	fontWeight: 'bold',
	fontSize: '1.05em',
	whiteSpace: 'break-spaces',
}));

type ListItemButtonStyledProps = {
	active: boolean;
} & ListItemButtonProps;

export const ListItemButtonStyled = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== 'active',
})<ListItemButtonStyledProps>(({ theme, active, }) => ({
	flex: 'none',
	color: active ? theme.palette.common.white : theme.palette.grey[800],
	backgroundImage: active ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})` : 'transparent',
	borderRadius: '10px',
	fontWeight: 'bold',
	whiteSpace: 'break-spaces',
	'&:hover': {
		backgroundImage: active ? theme.palette.primary.dark : theme.palette.grey[200],
	},
	'& .icon, & .text': {
		color: active ? theme.palette.common.white : theme.palette.grey[800],
	},
	
	transition: 'background-color .25s',
}));

export const ListSubItemButtonStyled = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== 'active',
})<ListItemButtonStyledProps>(({ theme, active, }) => ({
	flex: 'none',
	color: active ? theme.palette.primary.main : theme.palette.grey[800],
	borderRadius: '10px',
	fontWeight: 'bold',
	whiteSpace: 'break-spaces',

	'& .icon, & .text': {
		color: active ? theme.palette.primary.main : theme.palette.grey[800],
	},
}));