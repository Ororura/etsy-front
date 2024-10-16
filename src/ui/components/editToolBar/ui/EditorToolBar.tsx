import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { EditToolbarProps } from '../types';
import { useHandlerClick } from '../hooks/hooks';

const EditToolbar: FC<EditToolbarProps> = ({ setRows, setRowModesModel }) => {
  const { handleClick } = useHandlerClick({ setRows, setRowModesModel });
  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export { EditToolbar };
