import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { userStore } from 'core/store';
import { useGetUsers, useMutateData } from 'components/usersTable/hooks';
import { CreateUserType, DeleteUserType, UserRowsType } from 'components/usersTable';
import { usersApi } from 'services/query';
import TextField from '@mui/material/TextField';
import { AxiosResponse } from 'axios';
import { UseMutationResult } from '@tanstack/react-query';
import { useRedirectOnUnauthorized } from 'hoc/useRedirectOnUnauthorized';

interface EditToolbarProps {
  handlerChangeStateData: (data: UserRowsType[]) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  createData: UseMutationResult<AxiosResponse | undefined, Error, CreateUserType, unknown>;
}

function EditToolbar(props: EditToolbarProps) {
  const users = useStore(userStore, (state) => state['users']);
  const [userId, setUserId] = useState(0);
  const { handlerChangeStateData, setRowModesModel, createData } = props;

  const createUser = (data: UserRowsType) => {
    if (data) {
      createData.mutate({ telegram_id: data.user_id });
    }
  };

  const handleClick = () => {
    handlerChangeStateData([
      ...users,
      {
        user_id: userId,
        extra_parser: false,
        parser: false,
        hwid: '',
        pdfmaker: false,
        isNew: true,
        sender: true,
      },
    ]);

    createUser({
      user_id: userId,
      extra_parser: false,
      parser: false,
      hwid: '',
      pdfmaker: false,
      isNew: true,
      sender: true,
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [userId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <TextField
        sx={{ marginTop: '10px' }}
        label='User ID'
        variant='outlined'
        size='small'
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        style={{ marginRight: 8 }}
      />
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export const UserTable: FC = () => {
  const { error } = useGetUsers();
  useRedirectOnUnauthorized(error);
  const deleteData = useMutateData<DeleteUserType>(usersApi.deleteUserData);
  const updateData = useMutateData<UserRowsType>(usersApi.updateUserData);
  const createData = useMutateData<CreateUserType>(usersApi.createUser);
  const users = useStore(userStore, (state) => state['users']);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handlerChangeStateData = (data: UserRowsType[]) => {
    userStore.setState(() => ({
      users: data,
    }));
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    handlerChangeStateData(users.filter((row) => row.user_id !== id));
    deleteData.mutate({ user_id: Number(id) });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((row) => row.user_id === id);
    if (editedRow!.isNew) {
      handlerChangeStateData(users.filter((row) => row.user_id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as UserRowsType;
    handlerChangeStateData(users.map((row) => (row.user_id === newRow.id ? updatedRow : row)));
    if (updatedRow) {
      const data: UserRowsType = {
        user_id: updatedRow.user_id,
        hwid: updatedRow.hwid,
        pdfmaker: updatedRow.pdfmaker,
        parser: updatedRow.parser,
        sender: updatedRow.sender,
        extra_parser: updatedRow.extra_parser,
      };
      updateData.mutate(data);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'user_id',
      headerName: 'Telegram Id',
      type: 'number',
      width: 250,
      valueFormatter: (value) => value,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'hwid',
      headerName: 'HWID',
      type: 'string',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'pdfmaker',
      headerName: 'PDF Maker',
      type: 'boolean',
      width: 100,
      editable: true,
    },
    {
      field: 'parser',
      headerName: 'Parser',
      width: 100,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'sender',
      headerName: 'Sender',
      width: 100,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'extra_parser',
      headerName: 'Extra Parser',
      width: 100,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
        ];
      },
    },
  ];

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
        rows={users}
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
          toolbar: { handlerChangeStateData, setRowModesModel, createData },
        }}
      />
    </Box>
  );
};
