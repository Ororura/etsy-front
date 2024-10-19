import { GridRowModesModel } from '@mui/x-data-grid';
import { UserRowsType } from 'components/usersTable/types.ts';

type EditToolbarProps = {
  updateData: (data: UserRowsType) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  userId: string;
};

export type { EditToolbarProps };
