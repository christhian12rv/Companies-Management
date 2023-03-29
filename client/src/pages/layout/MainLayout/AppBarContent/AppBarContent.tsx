import { MenuRounded, FullscreenRounded } from '@mui/icons-material';
import { IconButton, Grid } from '@mui/material';
import React from 'react';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import { UserIcon, UserName, UserType } from './AppBarContent.styled';

type AppBarContentProps = {
	handleDrawerToggleSidebar: () => void;
	handleToggleFullScreen: () => void;
}

export const AppBarContent: React.FunctionComponent<AppBarContentProps> = ({ handleDrawerToggleSidebar, handleToggleFullScreen, }) => {
	return (
		<>
			<IconButton
				color="inherit"
				onClick={handleDrawerToggleSidebar}
				edge="start"
				sx={{
					mr: 1,
					outline: 'none !important',
				}}
			>
				<MenuRounded />
			</IconButton>

			<IconButton
				color="inherit"
				edge="start"
				onClick={handleToggleFullScreen}
				sx={{
					mr: 1,
					outline: 'none !important',
				}}
			>
				<FullscreenRounded />
			</IconButton>

			<LinkUnstyled to={RoutesEnum.LOGIN} sx={{ marginLeft: 'auto', }}>
				<Grid display="flex" alignItems="center" justifyContent="center" gap={1} sx={(theme): object => ({
					'&:hover .user-icon, &:hover .user-name, &:hover .user-type': {
						color: theme.palette.primary.dark,
						transition: 'all .15s',
					},
				})}>
					<UserIcon className="user-icon"/>
					<Grid display="flex" flexDirection="column" justifyContent="center">
						<UserName className="user-name" variant="h6">Christhian</UserName>
						<UserType className="user-type" variant="body1">Admin</UserType>
					</Grid>
				</Grid>
			</LinkUnstyled>
		</>
	);
};