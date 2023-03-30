import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { findAll as findAllAction } from '../../store/features/company/company.actions';
import CompanyType from '../../types/Company/CompanyType';
import { enqueueSnackbar } from 'notistack';
import { MainButton } from '../../components/MainButton';
import { useNavigate } from 'react-router';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { EditRounded, Visibility } from '@mui/icons-material';
import { AddressModal } from '../../components/AddressModal';
import AddressType from '../../types/Address/AddressType';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';
import { CompanyActionsTypes } from '../../store/features/company/company.types';
import { UpdateCompanyModal } from '../../components/UpdateCompanyModal/UpdateCompanyModal';

export const ListCompanies: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState<CompanyType[]>([]);
	const [loading, setLoading] = useState(false);
	const [companyClicked, setCompanyClicked] = useState<CompanyType | undefined>(undefined);
	const [editCompanyModalOpen, setEditCompanyModalOpen] = useState(false);
	const [addressModalOpen, setAddressModalOpen] = useState(false);
	const [addressClicked, setAddressClicked] = useState<AddressType | null>(null);
	const { user: loggedUser, } = useTypedSelector((state) => state.auth);
	const { request, previousType, } = useTypedSelector((state) => state.company);

	const handleClickEditCompany = (company: CompanyType): void => {
		setCompanyClicked(company);
		setEditCompanyModalOpen(true);
	};

	const handleEditCompanyModalClose = (): void => {
		setEditCompanyModalOpen(false);
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
			field: 'companyName',
			headerName: 'Razão Social',
			type: 'string',
			flex: 1,
			minWidth: 250,
		},
		{
			field: 'fantasyName',
			headerName: 'Nome Fantasia',
			type: 'string',
			flex: 1,
			minWidth: 250,
		},
		{
			field: 'cnpj',
			headerName: 'CNPJ',
			type: 'string',
			flex: 1,
			minWidth: 150,
		},
		{
			field: 'stateRegistration',
			headerName: 'Inscrição Estadual',
			type: 'string',
			flex: 1,
			minWidth: 150,
			renderCell: (params): any => {
				console.log(params);
				return params.row.stateRegistration || '-';
			},
		},
		{
			field: 'address',
			headerName: 'Endereço',
			type: 'string',
			flex: 1,
			minWidth: 150,
			renderCell: (params): any => {
				return <IconButton>
					<Visibility onClick={(): any => handleAddressOpenModalClick(params)}></Visibility>
				</IconButton>;
			},
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
				<GridActionsCellItem key={0} icon={<EditRounded />} onClick={(): void => handleClickEditCompany(params.row)} label="Editar" />
			],
		});
	}
      
	const fetchCompanies = async (): Promise<void> => {
		setLoading(true);
		const [response, json] = await findAllAction();
		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}
		if (json.companies) {
			json.companies.map(company => {
				company.createdAt = dayjs(company.createdAt).format('DD/MM/YYYY H:mm:ss');
			}) as CompanyType[];
			setRows(json.companies);
		}
		
		setLoading(false);
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

	useEffect(() => {
		if (previousType === CompanyActionsTypes.UPDATE_SUCCESS) {
			handleEditCompanyModalClose();
			fetchCompanies();
		}
	}, [request]);

	const handleAddCompanyClick = (): void => {
		navigate(RoutesEnum.COMPANY_CREATE);
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>
			{/* <BackdropLoading open={loading}/> */}

			<Typography variant="h5">Empresas</Typography>
			<MainButton onClick={handleAddCompanyClick} sx={{ minWidth: '200px', alignSelf: 'flex-end', }}>Criar Empresa</MainButton>

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

				<AddressModal
					address={addressClicked}
					open={addressModalOpen}
					onClose={handleAddressModalClose}
				/>
			</Box>

			<UpdateCompanyModal company={companyClicked} open={editCompanyModalOpen} onClose={handleEditCompanyModalClose}/>
		</Box>
	);
};