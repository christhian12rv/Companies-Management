import { Grid, Typography } from '@mui/material';
import React from 'react';
import AddressType from '../../types/Address/AddressType';
import { DialogStyled, Title } from './AddressModal.styled';

type AddressModalProps = {
	address: AddressType | null;
	open: boolean;
	onClose: () => any;
};

export const AddressModal: React.FunctionComponent<AddressModalProps> = ({ address, open, onClose, }) => {

	return (
		<DialogStyled open={open} onClose={onClose}>
			<Grid display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" sx={{ p: 3, height: '100%', }}>
				<Grid display="flex">
					<Title variant="h6">Rua:&nbsp;</Title>
					<Typography variant="h6">{address?.street}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">Número:&nbsp;</Title>
					<Typography variant="h6">{address?.number}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">Complemento:&nbsp;</Title>
					<Typography variant="h6">{address?.complement || '-'}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">Bairro:&nbsp;</Title>
					<Typography variant="h6">{address?.neighborhood}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">Cidade:&nbsp;</Title>
					<Typography variant="h6">{address?.city}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">UF:&nbsp;</Title>
					<Typography variant="h6">{address?.uf}</Typography>
				</Grid>
				<Grid display="flex">
					<Title variant="h6">CEP:&nbsp;</Title>
					<Typography variant="h6">{address?.cep}</Typography>
				</Grid>
			</Grid>
		</DialogStyled>
	);
};