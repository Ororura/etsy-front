import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid';
import { FC } from 'react';
import { useUsersColumns, useUserTable } from '../hooks';
import { EditToolbar } from 'components/editToolBar';
import { useQuery } from '@tanstack/react-query';

const UserTable: FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch('http://127.0.0.1:8000/get-all-users').then((res) => res.json()),
  });

  const { handleRowEditStop, handleRowModesModelChange, processRowUpdate, rowModesModel, setRowModesModel, setRows } =
    useUserTable();

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
        rows={data as GridRowsProp[]}
        columns={columns}
        editMode='row'
        getRowId={(row) => row.user_id}
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
