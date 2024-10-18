import Box from '@mui/material/Box';
import { DataGrid, GridSlots } from '@mui/x-data-grid';
import { FC } from 'react';
import { useGetUsers, useUsersColumns, useUserTable } from '../hooks';
import { EditToolbar } from 'components/editToolBar';
import { useStore } from '@tanstack/react-store';
import { userStore } from 'core/store';
const UserTable: FC = () => {
  const { userHandlers, rowModesModel, setRowModesModel, changeData } = useUserTable();
  useGetUsers();

  const { columns } = useUsersColumns();

  const data = useStore(userStore, (state) => {
    return state['users'];
  });
  return (
    <Box
      sx={{
        height: '100%',
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
        rows={data}
        columns={columns}
        editMode='row'
        getRowId={(row) => row.user_id}
        rowModesModel={rowModesModel}
        onRowModesModelChange={userHandlers.rowModesModelChange}
        onRowEditStop={userHandlers.rowEditStop}
        processRowUpdate={userHandlers.processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { changeData, setRowModesModel },
        }}
      />
    </Box>
  );
};

export { UserTable };
