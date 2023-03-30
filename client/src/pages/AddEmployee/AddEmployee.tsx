import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import EmployeeRegisterType from '../../types/Employee/EmployeeRegisterType';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { BackdropLoading } from '../../components/BackdropLoading';
import { create as createAction, clearRequest as clearRequestAction } from '../../store/features/employee/employee.actions';
import { findAll as findAllCompaniesAction } from '../../store/features/company/company.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { MainButton } from '../../components/MainButton';
import InputType from '../../types/Form/InputType';
import selectArrayBrazillianStates from '../../utils/selectArrayBrazillianStates';
import { EmployeeActionsTypes } from '../../store/features/employee/employee.types';
import { enqueueSnackbar } from 'notistack';

export const AddEmployee: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, previousType, } = useTypedSelector((state) => state.employee);
	const [fetchCompaniesLoading, setFetchCompaniesLoading] = useState(true);

	const [employee, setEmployee] = useState<EmployeeRegisterType>({
		name: '',
		companyId: 0,
		dependentsNumber: 0,
		rg: '',
		cpf: '',
		salary: 0,
		address: {
			street: '',
			number: 0,
			complement: '',
			neighborhood: '',
			city: '',
			uf: '',
			cep: '',
		},
	});

	const [inputs, setInputs] = useState<InputType[]>([
		{
			name: 'name',
			type: 'text',
			label: 'Nome *',
		},
		{
			name: 'companyId',
			type: 'text',
			label: 'Empresa *',
			select: [
				{
					text: 'asdf',
					value: 'asdf',
				}
			],
		},
		{
			name: 'dependentsNumber',
			type: 'number',
			label: 'Número de dependentes *',
		},
		{
			name: 'rg',
			type: 'text',
			label: 'RG *',
		},
		{
			name: 'cpf',
			type: 'text',
			label: 'CPF *',
		},
		{
			name: 'salary',
			type: 'text',
			label: 'Salário *',
		},
		{
			name: 'address.cep',
			type: 'text',
			label: 'CEP *',
		},
		{
			name: 'address.street',
			type: 'text',
			label: 'Rua *',
		},
		{
			name: 'address.number',
			type: 'number',
			label: 'Número *',
		},
		{
			name: 'address.complement',
			type: 'text',
			label: 'Complemento',
		},
		{
			name: 'address.neighborhood',
			type: 'text',
			label: 'Bairro *',
		},
		{
			name: 'address.city',
			type: 'text',
			label: 'Cidade *',
		},
		{
			name: 'address.uf',
			type: 'text',
			label: 'Estado *',
			select: selectArrayBrazillianStates,
		}
	]);

	const fetchCompanies = async (): Promise<void> => {
		setFetchCompaniesLoading(true);
		const [response, json] = await findAllCompaniesAction();
		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setFetchCompaniesLoading(false);
			return;
		}
		if (json.companies) {
			const companiesFetched = json.companies.map(company => ({
				text: company.companyName,
				value: company.id,
			}));
			
			const companyIdInputIndex = inputs.findIndex(i => i.name === 'companyId');
			const newInputs = inputs;
			newInputs[companyIdInputIndex].select = companiesFetched;
			
			setInputs(newInputs);
		}
		
		setFetchCompaniesLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchCompanies();
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Funcionário criado com sucesso',
		successNavigate: RoutesEnum.EMPLOYEE_LIST,
		type: {
			actualType: previousType,
			expectedType: EmployeeActionsTypes.CREATE_SUCCESS,
		},
	});

	const handleSubmitForm = (): void => {
		dispatch(createAction(employee));
	};

	const onCepInputChange = async (value): Promise<any> => {
		setEmployee({ ...employee, address: {
			...employee.address,
			cep: value,
		}, });

		const regexCepTest = new RegExp(/(^\d{5})-(\d{3}$)/).test(value);
		
		if (!regexCepTest)
			return;

		const response = await fetch(`https://viacep.com.br/ws/${value.replace('-', '')}/json/`, {
			method: 'GET',
			mode: 'cors',
		});
		const json = await response.json();

		setEmployee({ ...employee, address: {
			...employee.address,
			street: json.logradouro,
			complement: json.complemento,
			neighborhood: json.bairro,
			city: json.localidade,
			uf: json.uf,
			cep: value,
		}, });
	};

	const handleChangeEmployeeInput = (property, event): void => {
		if (property === 'address.cep') {
			onCepInputChange(event.target.value);
			return;
		}
		
		if (property.split('.')[1]) {
			setEmployee({ ...employee, address: { ...employee.address, [property.split('.')[1]]: event.target.value, }, });
			return;
		}
		
		setEmployee({ ...employee, [property]: event.target.value, });
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>
			<BackdropLoading open={loading && fetchCompaniesLoading}/>

			<Grid display="flex" flexWrap="wrap" alignItems="center">
				<Typography variant="h5" sx={{ flexGrow: 1, }}>Criar funcionário</Typography>
				<IconButton onClick={(): any => navigate(RoutesEnum.EMPLOYEE_LIST)}>
					<NavigateBeforeRounded sx={{ fontSize: '1.3em', }}/>
				</IconButton>
			</Grid>
			
			<FormControl>
				<Grid container columnSpacing={2} rowSpacing={2} sx={{ alignItems: 'flex-start', }}>
					{inputs.map(input => (
						<Grid key={input.name} item xs={12} md={6}>
							<TextField
								select={!!input.select}
								type={input.type}
								label={input.label}
								error={!!getRequestErrorByField(request, input.name)}
								helperText={getRequestErrorByField(request, input.name)?.message}
								onChange={(event): void => handleChangeEmployeeInput(input.name, event)}
								value={input.name.split('.')[1] ? employee.address[input.name.split('.')[1]] : employee[input.name]}
								fullWidth
							>
								{input.select && input.select.map(item => (
									<MenuItem key={item.value} value={item.value}>
										{item.text}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					))}

					<Grid item xs={12} md={12}>
						<MainButton onClick={handleSubmitForm} type="submit" sx={{ width: '200px', }}>Salvar</MainButton>
					</Grid>
				</Grid>
			</FormControl>
		</Box>
	);
};