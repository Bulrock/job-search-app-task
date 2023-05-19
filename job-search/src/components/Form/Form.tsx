import { useEffect, useState } from 'react';
import { Input, NumberInput, Box, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
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
import { IFormQuery } from '@/types/formQuery';

interface IFormProps {
  onFormSubmit: (formQuery: IFormQuery) => void;
}

export default function Form({ onFormSubmit }: IFormProps) {
  const { classes } = useStyles();
  const [catalogues, setCatalogues] = useState<ICataloguesResponse | null>(null);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);

  const form = useForm({
    initialValues: {
      catalogKey: '',
      slaryFrom: '',
      slaryTo: '',
    },
  });

  function onFormReset() {
    form.reset();
  }

  useEffect(() => {
    setIsLoadingCatalog(true);
    cataloguesService()
      .then((data) => {
        if (typeof data !== 'string') {
          setCatalogues(data);
        } else {
          setCatalogues(null);
        }
        setIsLoadingCatalog(false);
      })
      .catch(() => {
        setIsLoadingCatalog(false);
      });
  }, []);

  return (
    <Box className={styles.form} maw={315}>
      <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>Фильтры</span>
          <div onClick={onFormReset} className={styles.formResetWrapper}>
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
              {...form.getInputProps('catalogKey')}
            >
              <option className={styles.placeholder} key={randomId()} value="default" disabled>
                Выберите отрасль
              </option>
              {catalogues
                ? catalogues.map((item) => {
                    return (
                      <option key={item.key} value={item.key}>
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
              {...form.getInputProps('slaryFrom')}
            />
            <NumberInput
              classNames={classes}
              data-elem="salary-to-input"
              min={0}
              step={5000}
              placeholder="До"
              {...form.getInputProps('slaryTo')}
            />
          </Stack>
          <ButtonFullWidth
            style={STYLE_FORM_BUTTON}
            option={ButtonVariant['FILLED']}
            text="Применить"
          />
        </Stack>
      </form>
    </Box>
  );
}
