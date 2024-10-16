import { GridActionsCellItem, GridColDef, GridRowModes } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useUserTable } from '.';

const useUsersColumns = () => {
  const { handleSaveClick, handleCancelClick, handleEditClick, rowModesModel, handleDeleteClick } = useUserTable();
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'Telegram ID', width: 120, editable: false },
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
      field: 'pdfMaker',
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
      field: 'extraParser',
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
  return { columns };
};

export { useUsersColumns };
