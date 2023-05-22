import { Button } from '@mantine/core';

interface IButtonProps {
  color: string;
  option?: string;
  text: string;
  height: number;
  width: number;
  setDataElem: boolean;
}

export default function ButtonStandart({
  height,
  width,
  color,
  text,
  setDataElem,
  option = 'filled',
}: IButtonProps) {
  return (
    <Button
      data-elem={setDataElem ? 'search-button' : ''}
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
