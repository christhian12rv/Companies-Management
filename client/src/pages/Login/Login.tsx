import React, { useEffect, useState } from 'react';
import { Box, Grid, CardContent, FormControl, GlobalStyles, Theme, Typography, MenuItem, TextField, IconButton, InputAdornment } from '@mui/material';
import { DiagonalWavesBackground } from '../../assets/DiagonalWavesBackground';
import transformSvgComponentToUrl from '../../utils/transformSvgComponentToUrl';
import { useTheme } from '@emotion/react';
import { LoginCard, LoginIcon } from './Login.styled';
import AuthLoginType from '../../types/Auth/AuthLoginType';
import InputType from '../../types/Form/InputType';
import { MainButton } from '../../components/MainButton';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { login as loginAction, clearRequest as clearRequestAction } from '../../store/features/auth/auth.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { AuthActionsTypes } from '../../store/features/auth/auth.types';

export const Login: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, previousType, } = useTypedSelector((state) => state.auth);
	const theme = useTheme() as Theme;

	const getPasswordVisibilityButton = (name): any => {
		if (inputs.find(input => input.name === name)?.type === 'password')
			return <VisibilityOffRounded />;

		return <VisibilityRounded />;
	};

	const [inputs, setInputs] = useState<InputType[]>([
		{
			name: 'email',
			type: 'text',
			label: 'Email',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Senha',
			password: true,
		}
	]);

	const [login, setLogin] = useState<AuthLoginType>({
		email: '',
		password: '',
	});

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		successNavigate: RoutesEnum.USER_LIST,
		type: {
			actualType: previousType,
			expectedType: AuthActionsTypes.LOGIN_SUCCESS,
		},
	});

	const handleSubmitForm = (event): void => {
		event.preventDefault();
		dispatch(loginAction(login));
	};

	const handleChangeLoginInput = (property, event): void => {
		setLogin({ ...login, [property]: event.target.value, });
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

	const svgBackgroundUrl = transformSvgComponentToUrl(
		<DiagonalWavesBackground
			mainColor={theme.palette.primary.main} secondaryColor={theme.palette.primary.darker}
		/>
	);

	const globalStyles = (): any => ({
		body: {
			backgroundImage: `url(${svgBackgroundUrl})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			width: '100vw',
			height: '100vh',
		},
	});

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', }}>
			<GlobalStyles styles={globalStyles}/>

			<LoginCard>
				<CardContent>
					<LoginIcon/>
					<Typography variant="h5" sx={{ mb: 2, }}>Login</Typography>

					<form onSubmit={handleSubmitForm}>
						<FormControl>
							<Grid container spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'center', }}>
								{inputs.map(input => (
									<Grid key={input.name} item xs={12} md={12}>
										<TextField
											select={!!input.select}
											type={input.type}
											label={input.label}
											error={!!getRequestErrorByField(request, input.name)}
											helperText={getRequestErrorByField(request, input.name)?.message}
											onChange={(event): void => handleChangeLoginInput(input.name, event)}
											value={login[input.name]}
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
									<MainButton type="submit" sx={{ width: '200px', }}>Continuar</MainButton>
								</Grid>
							</Grid>
						</FormControl>
					</form>
				</CardContent>
			</LoginCard>
		</Box>
	);
};