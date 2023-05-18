import { Input, NumberInput, Button, Box, Stack, createStyles } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import styles from './Form.module.css';
import { COLOR_GRAY } from '@/constants/colors';
import { STYLE_FORM_BUTTON } from '@/constants/styles';
import iconChevronDown from '../../../public/IconChevronDown.svg';
import iconCloseForm from '../../../public/iconCloseForm.svg';
import Image from 'next/image';

const useStyles = createStyles(() => ({
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
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Form() {
  const { classes } = useStyles();

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
            defaultValue={'default'}
            component="select"
            rightSection={<Image src={iconChevronDown} alt="icon chevron" />}
          >
            <option className={styles.placeholder} key={randomId()} value="default" disabled>
              Выберите отрасль
            </option>
            {arr.map((item) => {
              return (
                <option key={randomId()} value={item}>
                  {item}
                </option>
              );
            })}
          </Input>
        </Stack>
        <Stack spacing={8}>
          <span className={styles.numberInputTitle}>Оклад</span>
          <NumberInput classNames={classes} min={0} step={5000} placeholder="От" />
          <NumberInput classNames={classes} min={0} step={5000} placeholder="До" />
        </Stack>
        <Button styles={STYLE_FORM_BUTTON} fullWidth variant="filled">
          Применить
        </Button>
      </Stack>
    </Box>
  );
}
