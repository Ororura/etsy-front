import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { FC } from 'react';

const ColorModeSelect: FC<SelectProps> = (props) => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) => setMode(event.target.value as 'system' | 'light' | 'dark')}
      SelectDisplayProps={{
        // @ts-ignore
        'data-screenshot': 'toggle-mode',
      }}
      {...props}
    >
      <MenuItem value='system'>System</MenuItem>
      <MenuItem value='light'>Light</MenuItem>
      <MenuItem value='dark'>Dark</MenuItem>
    </Select>
  );
};

export { ColorModeSelect };
