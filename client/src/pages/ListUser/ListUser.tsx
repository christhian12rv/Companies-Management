import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import dayjs from 'dayjs';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { findAll as findAllAction, clearRequest as clearRequestAction } from '../../store/features/user/user.actions';
import UserType from '../../types/User/UserType';
import { enqueueSnackbar } from 'notistack';
import { MainButton } from '../../components/MainButton';
import { useNavigate } from 'react-router';
import RoutesEnum from '../../types/enums/RoutesEnum';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';

export const ListUser: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState<UserType[]>([]);
	const [loading, setLoading] = useState(false);

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			type: 'number',
			width: 60,
		},
		{
			field: 'name',
			headerName: 'Nome',
			type: 'string',
			minWidth: 150,
		},
		{
			field: 'cpf',
			headerName: 'CPF',
			type: 'string',
			minWidth: 150,
		},
		{
			field: 'email',
			headerName: 'email',
			type: 'string',
			minWidth: 150,
		},
		{
			field: 'type',
			headerName: 'Tipo',
			type: 'string',
			minWidth: 100,
		},
		{
			field: 'createdAt',
			headerName: 'Criado em',
			type: 'Date',
			minWidth: 170,
		}
	];
      
	// const rows = [
	// 	{ id: 1, name: 'João da Silva', cpf: '123.123.123-12', email: 'joao@email.com', type: 'ADMIN', createdAt: dayjs(new Date()).format('DD/MM/YYYY hh:mm:ss'), }
	// ];

	useEffect(() => {
		setLoading(true);
		const fetchUsers = async (): Promise<void> => {
			const [response, json] = await findAllAction();
			if (response.status === 500) {
				enqueueSnackbar(json.message, { variant: 'error', });
				setLoading(false);
				return;
			}
			if (json.users) {
				const users = json.users.map(user => {
					user.type = user.type === UserTypeEnum.ADMIN ? 'Admin' : 'Padrão';
					user.createdAt = dayjs(user.createdAt).format('DD/MM/YYYY H:mm:ss');
				}) as UserType[];
				setRows(json.users);
			}
			
			setLoading(false);
		};

		fetchUsers();
	}, []);

	const handleAddUserClick = (): void => {
		navigate(RoutesEnum.USER_REGISTER);
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>
			{/* <BackdropLoading open={loading}/> */}

			<Typography variant="h5">Usuários</Typography>
			<MainButton onClick={handleAddUserClick} sx={{ minWidth: '200px', alignSelf: 'flex-end', }}>Registrar Usuário</MainButton>

			<Box>
				<DataGrid
					rows={rows}
					columns={columns}
					loading={loading}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					sx={{ minHeight: '300px', height: '100%', }}
				/>
			</Box>
		</Box>
	);
};