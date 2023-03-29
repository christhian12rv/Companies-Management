import React, { useEffect, useState } from 'react';
import { AssignmentIndRounded, BusinessRounded, DomainAddRounded, DomainRounded, ExpandLess, ExpandMore, GroupAddRounded, GroupRounded, PowerSettingsNewRounded } from '@mui/icons-material';
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import { DrawerHeader } from '../MainLayout.styled';
import { ListItemButtonStyled, ListSubItemButtonStyled, LogoTitle } from './SidebarDrawer.styled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../../../../store/features/auth/auth.actions';

type SidebarDrawerProps = {
	openSidebar: boolean;
	isMobile: boolean;
}

export const SidebarDrawer: React.FunctionComponent<SidebarDrawerProps> = ({ openSidebar, isMobile, }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [expandedItems, setExpandedItems] = useState<{ name: string; expanded: boolean; }[]>([]);

	const sidebarListItems = [
		{
			name: 'user',
			title: 'Usuários',
			icon:	<GroupRounded className="icon" />,
			items: [
				{
					title: 'Registrar Usuário',
					icon: <GroupAddRounded className="icon"/>,
					link: RoutesEnum.USER_REGISTER,
				},
				{
					title: 'Listar Usuários',
					icon: <GroupRounded className="icon"/>,
					link: RoutesEnum.USER_LIST,
				}
			],
		},
		{
			name: 'company',
			title: 'Empresas',
			icon:	<DomainRounded className="icon"/>,
			items: [
				{
					title: 'Adicionar Empresa',
					icon: <DomainAddRounded className="icon"/>,
					link: RoutesEnum.COMPANY_REGISTER,
				},
				{
					title: 'Listar Empresas',
					icon: <DomainRounded className="icon"/>,
					link: RoutesEnum.COMPANY_LIST,
				}
			],
		},
		{
			name: 'employee',
			title: 'Funcionários',
			icon:	<AssignmentIndRounded className="icon"/>,
			items: [
				{
					title: 'Adicionar Funcionário',
					icon: <GroupAddRounded className="icon"/>,
					link: RoutesEnum.EMPLOYEE_REGISTER,
				},
				{
					title: 'Listar Funcionários',
					icon: <GroupRounded className="icon"/>,
					link: RoutesEnum.EMPLOYEE_LIST,
				}
			],
		},
		{
			name: 'logout',
			title: 'Logout',
			icon:	<PowerSettingsNewRounded className="icon"/>,
			bottom: true,
			onClick: (): any => {
				logoutAction();
				navigate(RoutesEnum.LOGIN);
			},
		}
	];

	useEffect(() => {
		setExpandedItems(sidebarListItems.map(item => ({
			name: item.name,
			expanded: false,
		})));
	}, []);

	const handleExpandedChange = (name): void => {
		const newExpandedItems = expandedItems.map(item => {
			if (item.name === name)
				item.expanded = !item.expanded;

			return item;
		});
			
		setExpandedItems(newExpandedItems);
	};

	return (
		<>
			<DrawerHeader>
				<LinkUnstyled to={RoutesEnum.USER_LIST} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', }}>
					<BusinessRounded sx={{ fontSize: '2em', }}/>
					{openSidebar && (
						<LogoTitle
							variant="h6"
							px={2}
						>
									Gerenciamento de Empresas
						</LogoTitle>
					)}
				</LinkUnstyled>
			</DrawerHeader>

			<Divider />

			<List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 2, flexGrow: 1, }}>
				{sidebarListItems.map((sidebarItem, index) => (
					<React.Fragment key={sidebarItem.name}>
						<ListItemButtonStyled
							active={sidebarItem.items ? (
								!!sidebarItem.items.find(item => item.link === location.pathname)
							) : false}
							sx={{ ...(sidebarItem.bottom && { mt: 'auto', }), }}
							onClick={sidebarItem.onClick ? sidebarItem.onClick :
								(sidebarItem.items ? (): any => handleExpandedChange(sidebarItem.name) : undefined)}>
							<ListItemIcon sx={{ ml: '-3px', minWidth: '50px', }}>
								{sidebarItem.icon}
							</ListItemIcon>
							<ListItemText className="text" inset primary={sidebarItem.title} sx={{ pl: 0, }}/>
							{sidebarItem.items && (
								expandedItems.find(i => i.name === sidebarItem.name)?.expanded ? <ExpandLess /> : <ExpandMore />
							)}
						</ListItemButtonStyled>

						{sidebarItem.items && (
							<>
								<Collapse in={expandedItems.find(i => i.name === sidebarItem.name)?.expanded} timeout="auto">
									<List component="div" disablePadding>
										{sidebarItem.items.map((item) => (
											<ListSubItemButtonStyled
												key={item.title}
												active={item.link === location.pathname}
												sx={{ ml: openSidebar ? 2 : 0, }}
												onClick={(): any => navigate(item.link)}>
												<ListItemIcon>
													{item.icon}
												</ListItemIcon>
												{openSidebar && <ListItemText inset primary={item.title} sx={{ pl: 0, whiteSpace: 'break-spaces', }} />}
											</ListSubItemButtonStyled>
										))}
									</List>
								</Collapse>
							</>
						)}
						{!openSidebar && ((index < sidebarListItems.length - 2) && <Divider sx={{ width: '75%', mx: 'auto', }}/>)}
					</React.Fragment>
				))}
				
			</List>
		</>
	);
};