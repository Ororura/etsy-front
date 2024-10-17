import Box from '@mui/material/Box';
import { DataGrid, GridSlots } from '@mui/x-data-grid';
import { FC, useEffect } from 'react';
import { useUsersColumns, useUserTable } from '../hooks';
import { EditToolbar } from 'components/editToolBar';
import { useQuery } from '@tanstack/react-query';
import { userStore } from 'core/store';
import { UserType } from 'components/usersTable/types.ts';
const UserTable: FC = () => {
  const { data } = useQuery<UserType[]>({
    queryKey: ['get-all-users'],
  });

  useEffect(() => {
    if (data) {
      updateUsersStore(data);
    }
  }, [data]);

  const updateUsersStore = (users: UserType[]) => {
    userStore.setState(() => {
      return {
        ['users']: users,
      };
    });
  };

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
        rows={data}
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
