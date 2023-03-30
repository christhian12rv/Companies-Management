import React, { useEffect, useState } from 'react';
import { FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DialogStyled } from './UpdateCompanyModal.styled';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import RoutesEnum from '../../types/enums/RoutesEnum';
import InputType from '../../types/Form/InputType';
import CompanyType from '../../types/Company/CompanyType';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { BackdropLoading } from '../BackdropLoading';
import { MainButton } from '../MainButton';
import { update as updateAction, clearRequest as clearRequestAction } from '../../store/features/company/company.actions';
import CompanyUpdateType from '../../types/Company/CompanyUpdateType';
import selectArrayBrazillianStates from '../../utils/selectArrayBrazillianStates';

type UpdateCompanyModalProps = {
	company?: CompanyType;
	open: boolean;
	onClose: () => any;
};

export const UpdateCompanyModal: React.FunctionComponent<UpdateCompanyModalProps> = ({ company: selectedCompany, open, onClose, }) => {
	if (!selectedCompany)
		return <></>;
	
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, } = useTypedSelector((state) => state.company);

	const [inputs, setInputs] = useState<InputType[]>([
		{
			name: 'id',
			type: 'text',
			label: 'ID',
			disabled: true,
		},
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

	const [company, setCompany] = useState<CompanyUpdateType>({
		id: selectedCompany.id,
		companyName: selectedCompany.companyName,
		fantasyName: selectedCompany.fantasyName,
		cnpj: selectedCompany.cnpj,
		stateRegistration: selectedCompany.stateRegistration,
		address: {
			id: selectedCompany.address?.id || 0,
			street: selectedCompany.address?.street,
			number: selectedCompany.address?.number,
			complement: selectedCompany.address?.complement,
			neighborhood: selectedCompany.address?.neighborhood,
			city: selectedCompany.address?.city,
			uf: selectedCompany.address?.uf,
			cep: selectedCompany.address?.cep,
		},
	});

	useEffect(() => {
		dispatch(clearRequestAction());
		setCompany({
			id: selectedCompany.id,
			companyName: selectedCompany.companyName,
			fantasyName: selectedCompany.fantasyName,
			cnpj: selectedCompany.cnpj,
			stateRegistration: selectedCompany.stateRegistration,
			address: {
				id: selectedCompany.address?.id || 0,
				street: selectedCompany.address?.street,
				number: selectedCompany.address?.number,
				complement: selectedCompany.address?.complement,
				neighborhood: selectedCompany.address?.neighborhood,
				city: selectedCompany.address?.city,
				uf: selectedCompany.address?.uf,
				cep: selectedCompany.address?.cep,
			},
		});
	}, [selectedCompany]);

	useRequestVerification({
		request,
		successMessage: 'Empresa atualizada com sucesso',
		successNavigate: RoutesEnum.COMPANY_LIST,
	});

	const handleSubmitForm = (): void => {
		dispatch(updateAction(company));
	};

	const onCepInputChange = async (value): Promise<any> => {
		setCompany({ ...company, address: {
			...company.address,
			id: company.address?.id || 0,
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
			id: company.address?.id || 0,
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
			setCompany({ ...company, address: { ...company.address, id: company.address?.id || 0, [property.split('.')[1]]: event.target.value, }, });
			return;
		}
		
		setCompany({ ...company, [property]: event.target.value, });
	};
	
	return (
		<DialogStyled open={open} onClose={onClose}>
			<BackdropLoading open={loading}/>

			<Typography variant="h5" sx={{ flexGrow: 1, mb: 5, }}>Editar Empresa</Typography>

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
								disabled={input.disabled ?? false}
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
						<MainButton onClick={handleSubmitForm} type="submit" sx={{ width: '200px', }}>Atualizar</MainButton>
					</Grid>
				</Grid>
			</FormControl>
		</DialogStyled>
	);
};