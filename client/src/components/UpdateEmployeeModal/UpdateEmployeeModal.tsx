import React, { useEffect, useState } from 'react';
import { FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DialogStyled } from './UpdateEmployeeModal.styled';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import RoutesEnum from '../../types/enums/RoutesEnum';
import InputType from '../../types/Form/InputType';
import EmployeeType from '../../types/Employee/EmployeeType';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { BackdropLoading } from '../BackdropLoading';
import { MainButton } from '../MainButton';
import { update as updateAction, clearRequest as clearRequestAction } from '../../store/features/employee/employee.actions';
import { findAll as findAllCompaniesAction } from '../../store/features/company/company.actions';
import EmployeeUpdateType from '../../types/Employee/EmployeeUpdateType';
import selectArrayBrazillianStates from '../../utils/selectArrayBrazillianStates';
import { enqueueSnackbar } from 'notistack';

type UpdateEmployeeModalProps = {
	employee?: EmployeeType;
	open: boolean;
	onClose: () => any;
};

export const UpdateEmployeeModal: React.FunctionComponent<UpdateEmployeeModalProps> = ({ employee: selectedEmployee, open, onClose, }) => {
	if (!selectedEmployee)
		return <></>;
	
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, } = useTypedSelector((state) => state.employee);
	const [fetchCompaniesLoading, setFetchCompaniesLoading] = useState(true);

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

	const [employee, setEmployee] = useState<EmployeeUpdateType>({
		id: selectedEmployee.id,
		name: selectedEmployee.name,
		companyId: selectedEmployee.companyId,
		dependentsNumber: selectedEmployee.dependentsNumber,
		rg: selectedEmployee.rg,
		cpf: selectedEmployee.cpf,
		salary: selectedEmployee.salary,
		address: {
			id: selectedEmployee.address?.id || 0,
			street: selectedEmployee.address?.street,
			number: selectedEmployee.address?.number,
			complement: selectedEmployee.address?.complement,
			neighborhood: selectedEmployee.address?.neighborhood,
			city: selectedEmployee.address?.city,
			uf: selectedEmployee.address?.uf,
			cep: selectedEmployee.address?.cep,
		},
	});

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchCompanies();
		setEmployee({
			id: selectedEmployee.id,
			name: selectedEmployee.name,
			companyId: selectedEmployee.companyId,
			dependentsNumber: selectedEmployee.dependentsNumber,
			rg: selectedEmployee.rg,
			cpf: selectedEmployee.cpf,
			salary: selectedEmployee.salary,
			address: {
				id: selectedEmployee.address?.id || 0,
				street: selectedEmployee.address?.street,
				number: selectedEmployee.address?.number,
				complement: selectedEmployee.address?.complement,
				neighborhood: selectedEmployee.address?.neighborhood,
				city: selectedEmployee.address?.city,
				uf: selectedEmployee.address?.uf,
				cep: selectedEmployee.address?.cep,
			},
		});
	}, [selectedEmployee]);

	useRequestVerification({
		request,
		successMessage: 'Funcionário atualizado com sucesso',
		successNavigate: RoutesEnum.EMPLOYEE_LIST,
	});

	const handleSubmitForm = (event): void => {
		event.preventDefault();
		dispatch(updateAction(employee));
	};

	const onCepInputChange = async (value): Promise<any> => {
		setEmployee({ ...employee, address: {
			...employee.address,
			id: employee.address?.id || 0,
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
			id: employee.address?.id || 0,
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
			setEmployee({ ...employee, address: { ...employee.address, id: employee.address?.id || 0, [property.split('.')[1]]: event.target.value, }, });
			return;
		}
		
		setEmployee({ ...employee, [property]: event.target.value, });
	};
	
	return (
		<DialogStyled open={open} onClose={onClose}>
			<BackdropLoading open={loading}/>

			<Typography variant="h5" sx={{ flexGrow: 1, mb: 5, }}>Editar Funcionário</Typography>

			<form onSubmit={handleSubmitForm}>
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
									value={input.name.split('.')[1] ? (employee.address && employee.address[input.name.split('.')[1]]) : employee[input.name]}
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
							<MainButton type="submit" sx={{ width: '200px', }}>Atualizar</MainButton>
						</Grid>
					</Grid>
				</FormControl>
			</form>
		</DialogStyled>
	);
};