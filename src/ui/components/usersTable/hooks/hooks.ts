import {
  GridRowModesModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import React, { useState } from 'react';

const initialRows: GridRowsProp = [
  {
    id: 1,
    userId: 7145120124,
    hwid: '207ba29bfe606092ac81bcf444791c7ec489d60eef77afc748437dce90ccbd1e',
    pdfMaker: true,
    parser: true,
    sender: true,
    extraParser: true,
  },
  {
    id: 2,
    userId: 7145120125,
    hwid: '307ba29bfe606092ac81bcf444791c7ec489d60eef77afc748437dce90ccbd2e',
    pdfMaker: true,
    parser: false,
    sender: true,
    extraParser: false,
  },
  {
    id: 3,
    userId: 7145120126,
    hwid: '407ba29bfe606092ac81bcf444791c7ec489d60eef77afc748437dce90ccbd3e',
    pdfMaker: false,
    parser: true,
    sender: false,
    extraParser: true,
  },
];

const useUserTable = () => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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
