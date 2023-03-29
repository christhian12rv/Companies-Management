import { Box, CssBaseline, Slide, Toolbar, useMediaQuery, useScrollTrigger } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LocalStorageEnum from '../../../types/enums/LocalStorageEnum';
import ScreenSizeQuerysEnum from '../../../types/enums/ScreenSizeQuerysEnum';
import { AppBarContent } from './AppBarContent';
import { AppBarMobileStyled, AppBarStyled, BoxArea, DrawerHeader, DrawerMobileStyled, DrawerStyled, GridContainer } from './MainLayout.styled';
import { SidebarDrawer } from './SidebarDrawer';

type MainLayoutProps = {
  window?: () => Window;
}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ window, }) => {
	const isMobile = useMediaQuery('(max-width: ' + ScreenSizeQuerysEnum.MOBILE + 'px');
	const [openSidebar, setOpenSidebar] = useState(!isMobile ? localStorage.getItem(LocalStorageEnum.SIDEBAR_OPEN) === 'true' : false);
	const [fullscreen, setFullscreen] = useState(false);
	
	const container = window !== undefined ? (): any => window().document.body : undefined;

	const handleToggleFullScreen = (): void => {
		if (!fullscreen)
			document.body.requestFullscreen();
		else
			document.exitFullscreen();

		setFullscreen(!fullscreen);
	};

	const handleDrawerToggleSidebar = (): void => {
		localStorage.setItem(LocalStorageEnum.SIDEBAR_OPEN, openSidebar ? 'false' : 'true');
		setOpenSidebar(!openSidebar);
	};

	type HideOnScrollProps = {
		window?: () => Window;
		children: React.ReactElement;
	}

	const HideOnScroll = (props: HideOnScrollProps): any => {
		const { children, window, } = props;
		
		const trigger = useScrollTrigger({
			target: window ? window() : undefined,
		});
	
		return (
			<Slide appear={false} direction="down" in={!trigger || openSidebar}>
				{children}
			</Slide>
		);
	};

	const HideAppBarMobile = (props: MainLayoutProps): any => {
		return (
			<React.Fragment>
				<CssBaseline />
				<HideOnScroll {...props}>
					<AppBarMobileStyled  open={openSidebar}>
						<Toolbar>
							<AppBarContent
								handleDrawerToggleSidebar={handleDrawerToggleSidebar}
								handleToggleFullScreen={handleToggleFullScreen}
							/>
						</Toolbar>
					</AppBarMobileStyled>
				</HideOnScroll>
			</React.Fragment>
		);
	};

	return (
		<BoxArea>
			<GridContainer>
				<CssBaseline />
				<AppBarStyled position="fixed" open={openSidebar} sx={{
					display: !isMobile ? 'block' : 'none',
				}}>
					<Toolbar>
						<AppBarContent
							handleDrawerToggleSidebar={handleDrawerToggleSidebar}
							handleToggleFullScreen={handleToggleFullScreen}
						/>
					</Toolbar>
				</AppBarStyled>

				{ isMobile ? <HideAppBarMobile window={window} /> : <></> }
				
				<DrawerMobileStyled
					container={container}
					variant="temporary"
					open={openSidebar}
					onClose={handleDrawerToggleSidebar}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: isMobile ? 'block' : 'none',
					}}
				>
					<SidebarDrawer
						openSidebar={openSidebar}
						isMobile={isMobile}
					/>
				</DrawerMobileStyled>

				<DrawerStyled variant="permanent" open={openSidebar} sx={{
					display: !isMobile ? 'block' : 'none',
				}}>
					<SidebarDrawer
						openSidebar={openSidebar}
						isMobile={isMobile}
					/>
				</DrawerStyled>
				
				<Box sx={{ flexGrow: 1, overflowX: 'hidden',  }}>
					{!isMobile ? <DrawerHeader /> : <></>}
					<Box sx={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', overflowX: 'hidden', textAlign: 'start', mt: 2, pb: 5, pt: isMobile ? 5 : 0, px: 3, }}>
						<Outlet/>
					</Box>
				</Box>
			</GridContainer>
		</BoxArea>
	);
};