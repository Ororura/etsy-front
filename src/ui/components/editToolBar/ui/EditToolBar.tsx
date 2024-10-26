import AddIcon from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import { TextField, Button } from '@mui/material';
import { GridRowModesModel, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { UseMutationResult } from '@tanstack/react-query';
import { useStore } from '@tanstack/react-store';
import { AxiosResponse } from 'axios';
import { UserRowsType, CreateUserType, UpdateChance } from 'components/usersTable';
import { userStore } from 'core/store';
import { FC, useState } from 'react';

interface EditToolbarProps {
  handlerChangeStateData: (data: UserRowsType[]) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  createData: UseMutationResult<AxiosResponse | undefined, Error, CreateUserType, unknown>;
  updateChance: UseMutationResult<AxiosResponse | undefined, Error, UpdateChance, unknown>;
}

const EditToolbar: FC<EditToolbarProps> = ({ handlerChangeStateData, setRowModesModel, createData, updateChance }) => {
  const users = useStore(userStore, (state) => state['users']);
  const [userId, setUserId] = useState(0);
  const [chance, setChance] = useState(0);

  const handleChangeChance = () => {
    updateChance.mutate({ chance: chance });
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
        sender: false,
				subito: false
      },
    ]);

    createData.mutate({ telegram_id: userId });

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
        Add Record
      </Button>
      <TextField label='Chance' variant='outlined' size='small' onChange={(e) => setChance(Number(e.target.value))} />
      <Button color='primary' startIcon={<Edit />} onClick={handleChangeChance}>
        Set Chance
      </Button>
    </GridToolbarContainer>
  );
};

export { EditToolbar };
