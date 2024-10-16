import Box from '@mui/material/Box';
import { DataGrid, GridSlots } from '@mui/x-data-grid';
import { FC } from 'react';
import { useUsersColumns, useUserTable } from '../hooks';
import { EditToolbar } from 'components/editToolBar';

const UserTable: FC = () => {
  const {
    handleRowEditStop,
    handleRowModesModelChange,
    processRowUpdate,
    rowModesModel,
    rows,
    setRowModesModel,
    setRows,
  } = useUserTable();

  const { columns } = useUsersColumns();

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        getRowId={(row) => row.id}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export { UserTable };
