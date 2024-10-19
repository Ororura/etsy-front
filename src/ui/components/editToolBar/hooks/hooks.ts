import { useCallback } from 'react';
import { EditToolbarProps } from '../types';
import { GridRowModes } from '@mui/x-data-grid';

const useHandlerClick = ({ updateData, setRowModesModel, userId }: EditToolbarProps) => {
  const handleClick = useCallback(() => {
    updateData({
      user_id: Number(userId),
      hwid: '',
      pdfmaker: false,
      parser: false,
      sender: false,
      extra_parser: false,
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [userId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  }, [updateData, setRowModesModel, userId]);
  return { handleClick };
};

export { useHandlerClick };
