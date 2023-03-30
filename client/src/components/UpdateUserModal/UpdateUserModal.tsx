import React, { useEffect, useState } from 'react';
import { FormControl, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { DialogStyled } from './UpdateUserModal.styled';
import { LockRounded, NavigateBeforeRounded } from '@mui/icons-material';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import RoutesEnum from '../../types/enums/RoutesEnum';
import UserTypeEnum from '../../types/enums/User/UserTypeEnum';
import InputType from '../../types/Form/InputType';
import UserType from '../../types/User/UserType';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { BackdropLoading } from '../BackdropLoading';
import { MainButton } from '../MainButton';
import { update as updateAction, clearRequest as clearRequestAction } from '../../store/features/user/user.actions';
import UserUpdateType from '../../types/User/UserUpdateType';

type UpdateUserModalProps = {
	user?: UserType;
	open: boolean;
	onClose: () => any;
};

export const UpdateUserModal: React.FunctionComponent<UpdateUserModalProps> = ({ user: selectedUser, open, onClose, }) => {
	if (!selectedUser)
		return <></>;
	
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, } = useTypedSelector((state) => state.user);

	const [inputs, setInputs] = useState<InputType[]>([
		{
			name: 'id',
			type: 'text',
			label: 'ID',
			disabled: true,
		},
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
		}
	]);

	const [user, setUser] = useState<UserUpdateType>({
		id: selectedUser.id,
		name: selectedUser.name,
		cpf: selectedUser.cpf,
		email: selectedUser.email,
		type: selectedUser.type,
	});

	useEffect(() => {
		dispatch(clearRequestAction());
		setUser({
			id: selectedUser.id,
			name: selectedUser.name,
			cpf: selectedUser.cpf,
			email: selectedUser.email,
			type: selectedUser.type,
		});
	}, [selectedUser]);

	useRequestVerification({
		request,
		successMessage: 'Usuário atualizado com sucesso',
		successNavigate: RoutesEnum.USER_LIST,
	});

	const handleSubmitForm = (): void => {
		dispatch(updateAction(user));
	};

	const handleChangeUserInput = (property, event): void => {
		setUser({ ...user, [property]: event.target.value, });
	};
	
	return (
		<DialogStyled open={open} onClose={onClose}>
			<BackdropLoading open={loading}/>

			<Typography variant="h5" sx={{ flexGrow: 1, mb: 5, }}>Editar Usuário</Typography>

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
								onChange={(event): void => handleChangeUserInput(input.name, event)}
								value={user[input.name]}
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