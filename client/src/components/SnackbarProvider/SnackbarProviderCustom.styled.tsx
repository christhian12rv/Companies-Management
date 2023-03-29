import { styled } from '@mui/system';
import { MaterialDesignContent } from 'notistack';

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
	'&.notistack-MuiContent-default': {
		flexWrap: 'nowrap !important',
	},
	'&.notistack-MuiContent-success': {
		flexWrap: 'nowrap !important',
	},
	'&.notistack-MuiContent-error': {
		flexWrap: 'nowrap !important',
	},
	'&.notistack-MuiContent-warning': {
		flexWrap: 'nowrap !important',
	},
	'&.notistack-MuiContent-info': {
		flexWrap: 'nowrap !important',
	},
}));