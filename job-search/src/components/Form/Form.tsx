import { useEffect, useState } from 'react';
import { Input, NumberInput, Box, Stack } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import Image from 'next/image';

import cataloguesService from '@/services/cataloguesService';
import { ICataloguesResponse } from '@/types/responses';
import { useStyles } from '@/constants/formStyles';
import { STYLE_FORM_BUTTON } from '@/constants/styles';
import { ButtonVariant } from '@/types/buttons';
import ButtonFullWidth from '../Buttons/ButtonFullWidth/ButtonFullWidth';
import iconChevronDown from '@/../public/IconChevronDown.svg';
import iconCloseForm from '@/../public/iconCloseForm.svg';
import styles from './Form.module.css';

export default function Form() {
  const { classes } = useStyles();
  const [catalogues, setCatalogues] = useState<ICataloguesResponse | null>(null);
  const [isLoadingCatalogues, setIsLoadingCatalogues] = useState(false);

  useEffect(() => {
    setIsLoadingCatalogues(true);
    cataloguesService()
      .then((data) => {
        if (typeof data !== 'string') {
          setCatalogues(data);
        } else {
          setCatalogues(null);
        }
        setIsLoadingCatalogues(false);
      })
      .catch(() => {
        setIsLoadingCatalogues(false);
      });
  }, []);

  return (
    <Box className={styles.form} maw={315}>
      <div className={styles.formHeader}>
        <span className={styles.formTitle}>Фильтры</span>
        <div className={styles.formResetWrapper}>
          <span className={styles.formReset}>Сбросить все</span>
          <Image width={16} height={16} src={iconCloseForm} alt="icon close" />
        </div>
      </div>
      <Stack spacing={20}>
        <Stack spacing={8}>
          <span className={styles.numberInputTitle}>Отрасль</span>
          <Input
            classNames={classes}
            data-elem="industry-select"
            defaultValue="default"
            component="select"
            rightSection={<Image src={iconChevronDown} alt="icon chevron" />}
          >
            <option className={styles.placeholder} key={randomId()} value="default" disabled>
              Выберите отрасль
            </option>
            {catalogues
              ? catalogues.map((item) => {
                  return (
                    <option key={item.key} value={item.title_trimmed}>
                      {item.title_trimmed}
                    </option>
                  );
                })
              : 'Отрасли отсутствуют'}
          </Input>
        </Stack>
        <Stack spacing={8}>
          <span className={styles.numberInputTitle}>Оклад</span>
          <NumberInput
            classNames={classes}
            data-elem="salary-from-input"
            min={0}
            step={5000}
            placeholder="От"
          />
          <NumberInput
            classNames={classes}
            data-elem="salary-to-input"
            min={0}
            step={5000}
            placeholder="До"
          />
        </Stack>
        <ButtonFullWidth
          style={STYLE_FORM_BUTTON}
          option={ButtonVariant['FILLED']}
          text="Применить"
        />
      </Stack>
    </Box>
  );
}
