import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import CompanyRegisterType from '../../types/Company/CompanyRegisterType';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { BackdropLoading } from '../../components/BackdropLoading';
import { create as createAction, clearRequest as clearRequestAction } from '../../store/features/company/company.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { MainButton } from '../../components/MainButton';
import InputType from '../../types/Form/InputType';
import selectArrayBrazillianStates from '../../utils/selectArrayBrazillianStates';
import { CompanyActionsTypes } from '../../store/features/company/company.types';

export const AddCompany: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, previousType, } = useTypedSelector((state) => state.company);

	const [company, setCompany] = useState<CompanyRegisterType>({
		companyName: '',
		fantasyName: '',
		cnpj: '',
		stateRegistration: '',
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
			name: 'companyName',
			type: 'text',
			label: 'Razão social *',
		},
		{
			name: 'fantasyName',
			type: 'text',
			label: 'Nome fantasia *',
		},
		{
			name: 'cnpj',
			type: 'text',
			label: 'CNPJ *',
		},
		{
			name: 'stateRegistration',
			type: 'text',
			label: 'Inscrição estadual',
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

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Empresa criada com sucesso',
		successNavigate: RoutesEnum.COMPANY_LIST,
		type: {
			actualType: previousType,
			expectedType: CompanyActionsTypes.CREATE_SUCCESS,
		},
	});

	const handleSubmitForm = (): void => {
		dispatch(createAction(company));
	};

	const onCepInputChange = async (value): Promise<any> => {
		setCompany({ ...company, address: {
			...company.address,
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

		setCompany({ ...company, address: {
			...company.address,
			street: json.logradouro,
			complement: json.complemento,
			neighborhood: json.bairro,
			city: json.localidade,
			uf: json.uf,
			cep: value,
		}, });
	};

	const handleChangeCompanyInput = (property, event): void => {
		if (property === 'address.cep') {
			onCepInputChange(event.target.value);
			return;
		}
		
		if (property.split('.')[1]) {
			setCompany({ ...company, address: { ...company.address, [property.split('.')[1]]: event.target.value, }, });
			return;
		}
		
		setCompany({ ...company, [property]: event.target.value, });
	};

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>
			<BackdropLoading open={loading}/>

			<Grid display="flex" flexWrap="wrap" alignItems="center">
				<Typography variant="h5" sx={{ flexGrow: 1, }}>Criar empresa</Typography>
				<IconButton onClick={(): any => navigate(RoutesEnum.COMPANY_LIST)}>
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
								onChange={(event): void => handleChangeCompanyInput(input.name, event)}
								value={input.name.split('.')[1] ? company.address[input.name.split('.')[1]] : company[input.name]}
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