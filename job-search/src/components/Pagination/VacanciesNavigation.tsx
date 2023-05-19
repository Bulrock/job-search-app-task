import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Pagination } from '@mantine/core';

import classes from './VacanciesNavigation.module.css';

interface IVacanciesNavigationProps {
  total: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export default function VacanciesNavigation({ total, onPageChange }: IVacanciesNavigationProps) {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    onPageChange(activePage);
  }, [activePage, onPageChange]);

  return (
    <div className={classes.navigationWrapper}>
      <Pagination value={activePage} onChange={setActivePage} total={total} />
    </div>
  );
}
