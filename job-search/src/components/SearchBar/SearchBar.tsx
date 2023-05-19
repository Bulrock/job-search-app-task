import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { Input } from '@mantine/core';
import Image from 'next/image';

import { COLOR_BLUE_MAIN } from '@/constants/colors';
import { ISearchQuery } from '@/types/formQuery';
import ButtonStandart from '../Buttons/Button/ButtonStandart';
import iconSearch from '../../../public/iconSearch.svg';
import classes from './SearchBar.module.css';

interface ISearchBarProps {
  onSearchSubmit: Dispatch<SetStateAction<ISearchQuery>>;
}

export default function SearchBar({ onSearchSubmit }: ISearchBarProps) {
  const form = useForm({
    initialValues: {
      keyword: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSearchSubmit(values))}>
      <div className={classes.inputWrapper}>
        <Input
          icon={<Image src={iconSearch} alt="Search Icon" />}
          placeholder="Введите название вакансии"
          data-elem="search-input"
          {...form.getInputProps('keyword')}
        />
        <div className={classes.button}>
          <ButtonStandart height={32} width={83} color={COLOR_BLUE_MAIN} text="Поиск" />
        </div>
      </div>
    </form>
  );
}
