import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { findAll as findAllAction } from '../../store/features/user/user.actions';
import UserType from '../../types/User/UserType';
import { enqueueSnackbar } from 'notistack';
import { MainButton } from '../../components/MainButton';
import { useNavigate } from 'react-router';
import RoutesEnum from '../../types/enums/RoutesEnum';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';
import { EditRounded } from '@mui/icons-material';
import { UpdateUserModal } from '../../components/UpdateUserModal';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { UserActionsTypes } from '../../store/features/user/user.types';

export const ListUsers: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState<UserType[]>([]);
	const [loading, setLoading] = useState(false);
	const [userClicked, setUserClicked] = useState<UserType | undefined>(undefined);
	const [editUserModalOpen, setEditUserModalOpen] = useState(false);
	const { user: loggedUser, } = useTypedSelector((state) => state.auth);
	const { request, previousType, } = useTypedSelector((state) => state.user);

	const handleClickEditUser = (user: UserType): void => {
		setUserClicked(user);
		setEditUserModalOpen(true);
	};

	const handleEditUserModalClose = (): void => {
		setEditUserModalOpen(false);
	};

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			type: 'number',
			minWidth: 100,
			align: 'left',
			headerAlign: 'left',
		},
		{
			field: 'name',
			headerName: 'Nome',
			type: 'string',
			flex: 1,
			minWidth: 250,
		},
		{
			field: 'cpf',
			headerName: 'CPF',
			type: 'string',
			flex: 1,
			minWidth: 150,
		},
		{
			field: 'email',
			headerName: 'Email',
			type: 'string',
			flex: 1,
			minWidth: 250,
		},
		{
			field: 'type',
			headerName: 'Tipo',
			type: 'string',
			flex: 1,
			minWidth: 100,
			renderCell: (params) => params.row.type === UserTypeEnum.ADMIN ? 'Admin' : 'Padrão',
		},
		{
			field: 'createdAt',
			headerName: 'Criado em',
			type: 'Date',
			flex: 1,
			minWidth: 170,
		}
	];

	if (loggedUser?.type === UserTypeEnum.ADMIN) {
		columns.push({
			field: 'actions',
			type: 'actions',
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem key={0} icon={<EditRounded />} onClick={(): void => handleClickEditUser(params.row)} label="Editar" />
			],
		});
	}

	
	const fetchUsers = async (): Promise<void> => {
		setLoading(true);
		const [response, json] = await findAllAction();
		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}
		if (json.users) {
			json.users.map(user => {
				user.createdAt = dayjs(user.createdAt).format('DD/MM/YYYY H:mm:ss');
			}) as UserType[];
			setRows(json.users);
		}
		
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		if (previousType === UserActionsTypes.UPDATE_SUCCESS) {
			handleEditUserModalClose();
			fetchUsers();
		}
	}, [request]);

	const handleAddUserClick = (): void => {
		navigate(RoutesEnum.USER_REGISTER);
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>

			<Typography variant="h5">Usuários</Typography>
			{loggedUser?.type === UserTypeEnum.ADMIN && <MainButton onClick={handleAddUserClick} sx={{ minWidth: '200px', alignSelf: 'flex-end', }}>Registrar Usuário</MainButton>}

			<Box>
				<DataGrid
					rows={rows}
					columns={columns}
					loading={loading}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					autoHeight
				/>
			</Box>

			<UpdateUserModal user={userClicked} open={editUserModalOpen} onClose={handleEditUserModalClose}/>
		</Box>
	);
};