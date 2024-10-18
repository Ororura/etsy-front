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
import { UserRowsType, UserType } from 'components/usersTable/types.ts';

const useUserTable = () => {
  const usersData = useStore(userStore, (state) => state['users']) as UserRowsType[];
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const changeData = (data: UserRowsType[]) => {
    userStore.setState(() => ({
      ['users']: data,
    }));
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
  };
};

export type { UserType };
export { useUserTable };
