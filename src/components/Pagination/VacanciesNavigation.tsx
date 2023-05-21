import { Dispatch, SetStateAction } from 'react';
import { Pagination } from '@mantine/core';

import classes from './VacanciesNavigation.module.css';

interface IVacanciesNavigationProps {
  total: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  page: number;
}

export default function VacanciesNavigation({
  total,
  onPageChange,
  page,
}: IVacanciesNavigationProps) {
  return (
    <div className={classes.navigationWrapper}>
      <Pagination value={page} boundaries={3} onChange={onPageChange} total={total} />
    </div>
  );
}
