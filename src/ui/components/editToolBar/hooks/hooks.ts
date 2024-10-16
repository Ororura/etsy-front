import { useCallback } from 'react';
import { EditToolbarProps } from '../types';
import { GridRowModes } from '@mui/x-data-grid';

const useHandlerClick = ({ setRows, setRowModesModel }: EditToolbarProps) => {
  const handleClick = useCallback(() => {
    setRows((oldRows) => [...oldRows, { userId: '', hwid: '', pdfMaker: '', parser: '', sender: '', extraParser: '' }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [1]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  }, [setRows, setRowModesModel]);
  return { handleClick };
};

export { useHandlerClick };
