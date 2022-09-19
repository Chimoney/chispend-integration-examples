import React from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import { Pencil } from '../../assets';
import styles from './ColorPicker.module.css';

export const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: ColorChangeHandler;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={styles.container}>
      <p>{color}</p>
      <Pencil
        onClick={() => {
          setOpen((o) => !o);
        }}
      />
      <div className={styles.picker__container}>
        {open && <ChromePicker color={color} onChange={onChange} />}
      </div>
    </div>
  );
};
