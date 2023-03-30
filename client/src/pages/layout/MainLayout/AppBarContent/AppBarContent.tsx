import React from 'react';
import { MenuRounded, FullscreenRounded, DarkModeRounded } from '@mui/icons-material';
import { IconButton, Grid } from '@mui/material';
import { useTypedSelector } from '../../../../store/utils/useTypedSelector';
import { UserIcon, UserName, UserType } from './AppBarContent.styled';
import UserTypeEnum from '../../../../types/enums/User/UserTypeEnum';

type AppBarContentProps = {
	handleDrawerToggleSidebar: () => void;
	handleToggleFullScreen: () => void;
	handleDrawerToggleDarkMode: () => void;
}

export const AppBarContent: React.FunctionComponent<AppBarContentProps> = ({ handleDrawerToggleSidebar, handleToggleFullScreen, handleDrawerToggleDarkMode, }) => {
	const { user, } = useTypedSelector((state) => state.auth);
	
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

			<IconButton
				color="inherit"
				onClick={handleDrawerToggleDarkMode}
				edge="start"
				sx={{
					mr: 1,
					outline: 'none !important',
				}}
			>
				<DarkModeRounded />
			</IconButton>

			<Grid display="flex" alignItems="center" justifyContent="center" gap={1} sx={(theme): object => ({
				ml: 'auto',
				'&:hover .user-icon, &:hover .user-name, &:hover .user-type': {
					color: theme.palette.primary.dark,
					transition: 'all .15s',
				},
				transition: 'all .15s',
			})}>
				<UserIcon className="user-icon"/>
				<Grid display="flex" flexDirection="column" justifyContent="center">
					<UserName className="user-name" variant="h6">{user?.name.split(' ')[0]}</UserName>
					{user?.type === UserTypeEnum.ADMIN && <UserType className="user-type" variant="body1">Admin</UserType>}
				</Grid>
			</Grid>
		</>
	);
};