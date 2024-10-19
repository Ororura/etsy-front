import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { EditToolbarProps } from '../types';
import { useHandlerClick } from '../hooks/hooks';
import TextField from '@mui/material/TextField';

const EditToolbar: FC<EditToolbarProps> = ({ updateData, setRowModesModel }) => {
  const [userId, setUserId] = useState('');
  const { handleClick } = useHandlerClick({ updateData, setRowModesModel, userId });
  return (
    <GridToolbarContainer>
      <TextField
        label='User ID'
        variant='outlined'
        size='small'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export { EditToolbar };
