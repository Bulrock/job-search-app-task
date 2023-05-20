import { createStyles } from '@mantine/core';

import { COLOR_GRAY } from '@/constants/colors';

export const useStyles = createStyles(() => ({
  rightSection: {
    right: '5px',
  },
  input: {
    paddingRight: 'calc(1.5rem + 0.0625rem + 0.75rem)',
    borderRadius: '0.5rem',
    height: '2.625rem',
    letterSpacing: '0.03rem',
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
