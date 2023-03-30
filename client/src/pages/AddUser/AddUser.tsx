import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';
import UserRegisterType from '../../types/User/UserRegisterType';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { LockRounded, NavigateBeforeRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { BackdropLoading } from '../../components/BackdropLoading';
import { register as registerAction, clearRequest as clearRequestAction } from '../../store/features/user/user.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { MainButton } from '../../components/MainButton';
import InputType from '../../types/Form/InputType';

export const AddUser: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, } = useTypedSelector((state) => state.user);

	const getPasswordVisibilityButton = (name): any => {
		if (inputs.find(input => input.name === name)?.type === 'password')
			return <VisibilityOffRounded />;

		return <VisibilityRounded />;
	};

	const [inputs, setInputs] = useState<InputType[]>([
		{
			name: 'name',
			type: 'text',
			label: 'Nome',
		},
		{
			name: 'cpf',
			type: 'text',
			label: 'CPF',
		},
		{
			name: 'email',
			type: 'text',
			label: 'Email',
		},
		{
			name: 'type',
			type: 'text',
			label: 'Tipo',
			select: [
				{
					value: UserTypeEnum.STANDARD,
					text: 'Padrão',
				},
				{
					value: UserTypeEnum.ADMIN,
					text: 'Admin',
				}
			],
		},
		{
			name: 'password',
			type: 'password',
			label: 'Senha',
			password: true,
		},
		{
			name: 'confirmPassword',
			type: 'password',
			label: 'Confirmar senha',
			password: true,
		}
	]);

	const [user, setUser] = useState<UserRegisterType>({
		name: '',
		cpf: '',
		email: '',
		password: '',
		confirmPassword: '',
		type: UserTypeEnum.STANDARD,
	});

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Usuário cadastrado com sucesso',
		successNavigate: RoutesEnum.USER_LIST,
	});

	const handleSubmitForm = (): void => {
		dispatch(registerAction(user));
	};

	const handleChangeUserInput = (property, event): void => {
		setUser({ ...user, [property]: event.target.value, });
	};

	const handleChangeInputPasswordVisibility = (name): void => {
		const newInputs = inputs.map(input => {
			if (input.name === name)
				input.type = input.type === 'password' ? 'text' : 'password';
			return input;
		});

		setInputs(newInputs);
	};

	const getPasswordInputProps = (name): object => ({
		startAdornment: (
			<InputAdornment position="start">
				<LockRounded/>
			</InputAdornment>
		),
		endAdornment: (
			<InputAdornment position="end">
				<IconButton
					onClick={(): void => handleChangeInputPasswordVisibility(name)}
					onMouseDown={(event): void => {
						event.preventDefault(); 
					}}
					edge="end"
				>
					{getPasswordVisibilityButton(name)}
				</IconButton>
			</InputAdornment>
		),
	});

	return (
		<Box sx={{ display:'flex', flexDirection:'column', gap: 2, p: 2, }}>
			<BackdropLoading open={loading}/>

			<Grid display="flex" flexWrap="wrap" alignItems="center">
				<Typography variant="h5" sx={{ flexGrow: 1, }}>Registrar Usuário</Typography>
				<IconButton onClick={(): any => navigate(RoutesEnum.USER_LIST)}>
					<NavigateBeforeRounded sx={{ fontSize: '1.3em', }}/>
				</IconButton>
			</Grid>
			
			<FormControl>
				<Grid container columnSpacing={2} rowSpacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'center', }}>
					{inputs.map(input => (
						<Grid key={input.name} item xs={12} md={6}>
							<TextField
								select={!!input.select}
								type={input.type}
								label={input.label}
								error={!!getRequestErrorByField(request, input.name)}
								helperText={getRequestErrorByField(request, input.name)?.message}
								onChange={(event): void => handleChangeUserInput(input.name, event)}
								value={user[input.name]}
								InputProps={input.password ? getPasswordInputProps(input.name) : {}}
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