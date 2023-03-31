import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { findAll as findAllAction, clearRequest as clearRequestAction } from '../../store/features/employee/employee.actions';
import EmployeeType from '../../types/Employee/EmployeeType';
import { enqueueSnackbar } from 'notistack';
import { MainButton } from '../../components/MainButton';
import { useNavigate } from 'react-router';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { EditRounded, Visibility } from '@mui/icons-material';
import { AddressModal } from '../../components/AddressModal';
import AddressType from '../../types/Address/AddressType';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';
import { EmployeeActionsTypes } from '../../store/features/employee/employee.types';
import { UpdateEmployeeModal } from '../../components/UpdateEmployeeModal';
import { DataGridCustom } from '../../components/DataGridCustom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

export const ListEmployees: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState<EmployeeType[]>([]);
	const [loading, setLoading] = useState(false);
	const [employeeClicked, setEmployeeClicked] = useState<EmployeeType | undefined>(undefined);
	const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
	const [addressModalOpen, setAddressModalOpen] = useState(false);
	const [addressClicked, setAddressClicked] = useState<AddressType | null>(null);
	const { user: loggedUser, } = useTypedSelector((state) => state.auth);
	const { request, previousType, } = useTypedSelector((state) => state.employee);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const handleClickEditEmployee = (employee: EmployeeType): void => {
		setEmployeeClicked(employee);
		setEditEmployeeModalOpen(true);
	};

	const handleEditEmployeeModalClose = (): void => {
		setEditEmployeeModalOpen(false);
	};

	const handleAddressOpenModalClick = (params): void => {
		setAddressClicked(params.row.address);
		setAddressModalOpen(true);
	};

	const handleAddressModalClose = (): void => {
		setAddressModalOpen(false);
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
			minWidth: 200,
		},
		{
			field: 'company.companyName',
			headerName: 'Empresa',
			type: 'string',
			flex: 1,
			minWidth: 200,
			renderCell: (params): any => params.row.company.fantasyName,
		},
		{
			field: 'dependentsNumber',
			headerName: 'Dependentes',
			type: 'number',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'rg',
			headerName: 'RG',
			type: 'string',
			flex: 1,
			minWidth: 150,
		},
		{
			field: 'cpf',
			headerName: 'CPF',
			type: 'string',
			flex: 1,
			minWidth: 150,
		},
		{
			field: 'address',
			headerName: 'Endereço',
			type: 'string',
			flex: 1,
			minWidth: 100,
			renderCell: (params): any => (
				<IconButton onClick={(): any => handleAddressOpenModalClick(params)}>
					<Visibility />
				</IconButton>
			),
		},
		{
			field: 'salary',
			headerName: 'Salário',
			type: 'number',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'discount',
			headerName: 'Desconto',
			type: 'number',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'createdAt',
			headerName: 'Criado em',
			type: 'Date',
			flex: 1,
			minWidth: 170,
		},
		{
			field: 'actions',
			type: 'actions',
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem key={0} icon={<EditRounded />} onClick={(): void => handleClickEditEmployee(params.row)} label="Editar" />
			],
		}
	];
      
	const fetchEmployees = async (): Promise<void> => {
		setLoading(true);
		const [response, json] = await findAllAction();
		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}
		if (json.employees) {
			json.employees.map(employee => {
				employee.createdAt = dayjs(employee.createdAt).format('DD/MM/YYYY H:mm:ss');
			}) as EmployeeType[];
			setRows(json.employees);
		}
		
		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchEmployees();
	}, []);

	useEffect(() => {
		if (previousType === EmployeeActionsTypes.UPDATE_SUCCESS) {
			handleEditEmployeeModalClose();
			fetchEmployees();
		}
	}, [request]);

	const handleAddEmployeeClick = (): void => {
		navigate(RoutesEnum.EMPLOYEE_CREATE);
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>

			<Typography variant="h5">Funcionários</Typography>
			<MainButton onClick={handleAddEmployeeClick} sx={{ minWidth: '200px', alignSelf: 'flex-end', }}>Criar Funcionário</MainButton>

			<Box>
				<DataGridCustom
					rows={rows}
					columns={columns}
					loading={loading}
				/>

				<AddressModal
					address={addressClicked}
					open={addressModalOpen}
					onClose={handleAddressModalClose}
				/>
			</Box>

			<UpdateEmployeeModal employee={employeeClicked} open={editEmployeeModalOpen} onClose={handleEditEmployeeModalClose}/>
		</Box>
	);
};