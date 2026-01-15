import { memo, useCallback } from 'react';
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
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  }, [onSearchChange]);

  const handleSortKeyChange = useCallback((
    _event: React.MouseEvent<HTMLElement>,
    newKey: SortKey | null
  ) => {
    if (newKey !== null) {
      onSortKeyChange(newKey);
    }
  }, [onSortKeyChange]);

  const handleSortDirectionChange = useCallback((
    _event: React.MouseEvent<HTMLElement>,
    newDirection: SortDirection | null
  ) => {
    if (newDirection !== null) {
      onSortDirectionChange(newDirection);
    }
  }, [onSortDirectionChange]);

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
            <SortByAlphaIcon sx={countriesToolbarStyles.sortIcon} />
            Name
          </ToggleButton>
          <ToggleButton value="population">
            <TrendingUpIcon sx={countriesToolbarStyles.sortIcon} />
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
            <ArrowUpwardIcon sx={countriesToolbarStyles.directionIcon} />
          </ToggleButton>
          <ToggleButton value="desc">
            <ArrowDownwardIcon sx={countriesToolbarStyles.directionIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
});

export default CountriesToolbar;

