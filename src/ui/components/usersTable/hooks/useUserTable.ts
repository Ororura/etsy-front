import {
  GridRowModesModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { UserType } from '../types';

const useUserTable = (initialRows: UserType[]) => {
  const [rows, setRows] = useState<GridRowsProp>(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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
    setRows(rows.filter((row) => row.user_id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.user_id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.user_id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return {
    rows,
    setRows,
    setRowModesModel,
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    handleRowEditStop,
    processRowUpdate,
    handleRowModesModelChange,
  };
};

export { useUserTable };
