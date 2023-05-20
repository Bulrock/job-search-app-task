import { Button } from '@mantine/core';

interface IButtonProps {
  style: {
    [key: string]: {
      [key: string]: string;
    };
  };
  option: string;
  text: string;
}

export default function FullWidthButton({ style, option, text }: IButtonProps) {
  return (
    <Button data-elem="search-button" type="submit" styles={style} fullWidth variant={option}>
      {text}
    </Button>
  );
}
