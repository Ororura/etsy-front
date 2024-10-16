import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridSlots,
} from '@mui/x-data-grid';
import { FC } from 'react';
import { useUserTable } from '../hooks';

type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
};

const EditToolbar: FC<EditToolbarProps> = (props) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setRows((oldRows) => [...oldRows, { userId: '', hwid: '', pdfMaker: '', parser: '', sender: '', extraParser: '' }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [1]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

const UserTable: FC = () => {
  const {
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleSaveClick,
    handleRowEditStop,
    handleRowModesModelChange,
    processRowUpdate,
    rowModesModel,
    rows,
		setRowModesModel,
		setRows,
  } = useUserTable();
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
        rows={rows}
        columns={columns}
        editMode='row'
        getRowId={(row) => row.id}
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
