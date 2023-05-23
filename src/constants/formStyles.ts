import { MantineTheme, createStyles } from '@mantine/core';

import { COLOR_GRAY, COLOR_BLACK } from '@/constants/colors';

export const useCatalogStyles = createStyles((theme: MantineTheme, isSelected: boolean) => ({
  rightSection: {
    right: '5px',
  },
  input: {
    paddingRight: 'calc(1.5rem + 0.0625rem + 0.75rem)',
    borderRadius: '0.5rem',
    height: '2.625rem',
    letterSpacing: '0.03rem',
    color: `${isSelected ? COLOR_BLACK : COLOR_GRAY}`,
  },
  rootButton: {
    backgroundColor: '#5E96FC',
  },
}));

export const useInputsStyles = createStyles(() => ({
  rightSection: {
    right: '5px',
  },
  input: {
    paddingRight: 'calc(1.5rem + 0.0625rem + 0.75rem)',
    borderRadius: '0.5rem',
    height: '2.625rem',
    letterSpacing: '0.03rem',
    color: COLOR_BLACK,
  },
  controlUp: {
    borderLeft: 'none',
    borderBottom: 'none',
    color: COLOR_GRAY,
  },
  controlDown: {
    borderLeft: 'none',
    color: COLOR_GRAY,
  },
  rootButton: {
    backgroundColor: '#5E96FC',
  },
}));
