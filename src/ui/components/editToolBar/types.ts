import { GridRowsProp, GridRowModesModel } from '@mui/x-data-grid';

type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
};

export type { EditToolbarProps };
