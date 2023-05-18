import { Input } from '@mantine/core';
import Image from 'next/image';

import { COLOR_BLUE_MAIN } from '@/constants/colors';
import ButtonStandart from '../Buttons/Button/ButtonStandart';
import iconSearch from '../../../public/iconSearch.svg';
import classes from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={classes.inputWrapper}>
      <Input
        icon={<Image src={iconSearch} alt="Search Icon" />}
        placeholder="Введите название вакансии"
      />
      <div className={classes.button}>
        <ButtonStandart height={32} width={83} color={COLOR_BLUE_MAIN} text="Поиск" />
      </div>
    </div>
  );
}
