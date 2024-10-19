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
import { UserRowsType } from 'components/usersTable/types.ts';

const useUserTable = () => {
  const usersData = useStore(userStore, (state) => state['users']) as UserRowsType[];
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const changeData = (data: UserRowsType[]) => {
    userStore.setState(() => ({
      ['users']: data,
    }));
  };

  const updateData = (data: UserRowsType) => {
    userStore.setState((state) => ({
      users: [...state.users, data],
    }));
    if (data) {
      fetch('http://127.0.0.1:8000/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      fetch('http://127.0.0.1:8000/change-user-data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
        }),
      });
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
        fetch('http://127.0.0.1:8000/change-user-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: updatedRow.user_id,
            hwid: updatedRow.hwid,
            pdfmaker: updatedRow.pdfmaker,
            parser: updatedRow.parser,
            sender: updatedRow.sender,
            extra_parser: updatedRow.extra_parser,
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
    updateData,
  };
};

export { useUserTable };
