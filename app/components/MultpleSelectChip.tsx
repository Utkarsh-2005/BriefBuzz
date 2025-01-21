import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'World',
  'Technology',
  'Science',
  'Sports',
  'Health',
  'Finance',
  'Politics',
  'Entertainment'
];

function getStyles(name: string, selectedTopics: readonly string[], theme: Theme) {
  return {
    fontWeight: selectedTopics.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    backgroundColor: selectedTopics.includes(name) ? '#fcdf80' : 'transparent',
  };
}

interface MultipleSelectChipProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MultipleSelectChip({ 
  selectedTopics, 
  onTopicsChange,
  open,
  onOpen,
  onClose
}: MultipleSelectChipProps) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedTopics>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    onTopicsChange(newValue);
  };

  const handleClearAll = () => {
    onTopicsChange([]);
  };

  const handleDelete = (topicToDelete: string) => {
    onTopicsChange(selectedTopics.filter((topic) => topic !== topicToDelete));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <FormControl
        sx={{
          m: 1,
          width: 150,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e9b308',
            },
            '&.Mui-focused': {
              color: '#e9b308',
            },
          },
        }}
      >
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            '&.Mui-focused': {
              color: '#e9b308',
            },
          }}
        >
          Topics
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTopics}
          onChange={handleChange}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          input={<OutlinedInput id="select-multiple-chip" label="Topics" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                  key={value} 
                  label={value} 
                  onDelete={() => handleDelete(value)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedTopics, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}