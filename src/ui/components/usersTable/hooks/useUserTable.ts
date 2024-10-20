import {
  GridRowModesModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModel,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { userStore } from 'core/store';
import { DeleteUserType, UserRowsType } from 'components/usersTable/types.ts';
import { usersApi } from 'services/query';
import { useMutateData } from 'components/usersTable/hooks/useMutateData.ts';

const useUserTable = () => {
  const usersData = useStore(userStore, (state) => state['users']) as UserRowsType[];
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const accessToken = localStorage.getItem('accessToken');
  const deleteData = useMutateData<DeleteUserType>(usersApi.deleteUserData);
  const updateData = useMutateData<UserRowsType>(usersApi.updateUserData);

  const changeData = (data: UserRowsType[]) => {
    userStore.setState(() => ({
      ['users']: data,
    }));
  };

  const createUser = (data: UserRowsType) => {
    userStore.setState((state) => ({
      users: [...state.users, data],
    }));
    if (data) {
      fetch('http://193.233.254.138/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          telegram_id: data.user_id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error updating user data');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const userHandlers = {
    rowEditStop: ((params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    }) as GridEventListener<'rowEditStop'>,
    editClick: (id: GridRowId) => () => {
      setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    },
    saveClick: (id: GridRowId) => () => {
      setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
    },
    deleteClick: (id: GridRowId) => () => {
      changeData(usersData.filter((row) => row.user_id !== id));
      deleteData.mutate({ user_id: Number(id) });
    },
    cancelClick: (id: GridRowId) => () => {
      setRowModesModel((prev) => ({
        ...prev,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));

      const editedRow = usersData.find((row) => row.user_id === id);
      if (editedRow?.isNew) {
        changeData(usersData.filter((row) => row.user_id !== id));
      }
    },
    processRowUpdate: (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false } as UserRowsType;

      changeData(usersData.map((row) => (row.user_id === newRow.user_id ? updatedRow : row)));
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
    },
    rowModesModelChange: (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    },
  };

  return {
    userHandlers,
    setRowModesModel,
    rowModesModel,
    changeData,
    updateData: createUser,
  };
};

export { useUserTable };
