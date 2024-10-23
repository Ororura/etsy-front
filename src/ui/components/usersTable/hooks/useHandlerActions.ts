import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModel,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { userStore } from 'core/store';
import { DeleteUserType, UserRowsType } from '../types';
import { useStore } from '@tanstack/react-store';
import { usersApi } from 'services/query';
import { useState } from 'react';
import { useMutateData } from './useMutateData';

const useHanderlActions = () => {
  const deleteData = useMutateData<DeleteUserType>(usersApi.deleteUserData);
  const updateData = useMutateData<UserRowsType>(usersApi.updateUserData);
  const users = useStore(userStore, (state) => state['users']);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handlerChangeStateData = (data: UserRowsType[]) => {
    if (data.length === 0) {
      console.error('Data can not be empty!');
      return;
    }
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
				subito: updatedRow.subito
      };
      updateData.mutate(data);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return {
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange,
    setRowModesModel,
		handlerChangeStateData,
    users,
    rowModesModel,
  };
};

export { useHanderlActions };
