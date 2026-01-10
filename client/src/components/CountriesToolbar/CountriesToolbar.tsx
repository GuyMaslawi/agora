import React, { memo } from 'react';
import { Box, TextField, ToggleButton, ToggleButtonGroup, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortKey, SortDirection } from '../CountriesPage/CountriesPage';
import { countriesToolbarStyles } from './CountriesToolbar.sx';

interface CountriesToolbarProps {
  searchQuery: string;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSearchChange: (query: string) => void;
  onSortKeyChange: (key: SortKey) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

const CountriesToolbar = memo(function CountriesToolbar({
  searchQuery,
  sortKey,
  sortDirection,
  onSearchChange,
  onSortKeyChange,
  onSortDirectionChange,
}: CountriesToolbarProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSortKeyChange = (
    _event: React.MouseEvent<HTMLElement>,
    newKey: SortKey | null
  ) => {
    if (newKey !== null) {
      onSortKeyChange(newKey);
    }
  };

  const handleSortDirectionChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDirection: SortDirection | null
  ) => {
    if (newDirection !== null) {
      onSortDirectionChange(newDirection);
    }
  };

  return (
    <Box sx={countriesToolbarStyles.container}>
      <TextField
        fullWidth
        placeholder="Search countries by name..."
        value={searchQuery}
        onChange={handleSearchChange}
        sx={countriesToolbarStyles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={countriesToolbarStyles.searchIcon} />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={countriesToolbarStyles.sortControls}>
        <Typography variant="body2" sx={countriesToolbarStyles.sortLabel}>
          Sort:
        </Typography>
        <ToggleButtonGroup
          value={sortKey}
          exclusive
          onChange={handleSortKeyChange}
          size="small"
          sx={countriesToolbarStyles.toggleGroup}
        >
          <ToggleButton value="name">
            <SortByAlphaIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            Name
          </ToggleButton>
          <ToggleButton value="population">
            <TrendingUpIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            Population
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={sortDirection}
          exclusive
          onChange={handleSortDirectionChange}
          size="small"
          sx={countriesToolbarStyles.toggleGroup}
        >
          <ToggleButton value="asc">
            <ArrowUpwardIcon sx={{ fontSize: '1rem' }} />
          </ToggleButton>
          <ToggleButton value="desc">
            <ArrowDownwardIcon sx={{ fontSize: '1rem' }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
});

export default CountriesToolbar;

