import { Button } from '@mantine/core';

interface IButtonProps {
  color: string;
  option?: string;
  text: string;
  height: number;
  width: number;
}

export default function ButtonStandart({
  height,
  width,
  color,
  text,
  option = 'filled',
}: IButtonProps) {
  return (
    <Button
      data-elem="search-button"
      h={height}
      w={width}
      radius={8}
      color={color}
      variant={option}
      type="submit"
    >
      {text}
    </Button>
  );
}
