import { DataGrid, DataGridProps, ptBR } from '@mui/x-data-grid';
import React from 'react';

export const DataGridCustom: React.FunctionComponent<DataGridProps> = (props) => {
	return (
		<DataGrid
			{...props}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 10,
					},
				},
			}}
			pageSizeOptions={[10, 25, 50, 100]}
			autoHeight
			localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
		/>
	);
};