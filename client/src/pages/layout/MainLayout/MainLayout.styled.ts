import { AppBar, Box, CSSObject, Drawer, Grid, styled, Theme } from '@mui/material';

const drawerWidth = 240;

export const BoxArea = styled(Box)(() => ({
	width: '100%',
	margin: '0 !important',
	padding: '0 !important',
}));

export const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	width: '100%',
	padding: '2em 1em',
}));

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

export const DrawerHeader = styled('div')(({ theme, }) => ({
	display: 'flex',
	alignItems: 'center',
	height: '65px !important',
	justifyContent: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

interface AppBarStyledProps {
  open?: boolean;
}

export const AppBarStyled = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledProps>(({ theme, open, }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	left: 65,
	backgroundColor: theme.palette.common.white,
	boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
	height: 65,
	width: 'calc(100% - 65px)',
	...(open && {
		marginLeft: drawerWidth - 65,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const AppBarMobileStyled = styled(AppBar)<AppBarStyledProps>(({ theme, }) => ({
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: theme.palette.common.white,
	boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
	height: 65,
}));

export const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open', })(
	({ theme, open, }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		'& .MuiPaper-root': {
			zIndex: theme.zIndex.drawer + 2,
			boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
			border: 'none',
			padding: open ? '0 1em' : '0 .5em',
		},
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	})
);

export const DrawerMobileStyled = styled(Drawer)(() => ({
	'& .MuiDrawer-paper': {
		boxSizing: 'border-box',
		width: drawerWidth,
		overflow: 'hidden',
		padding: '0 1em',
	},
})
);