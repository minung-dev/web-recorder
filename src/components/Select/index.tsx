import React from 'react';
import styles from './styles.module.css';

import Button from '../Button';

type Item = {
  name: string,
  value: string,
};

type SelectProps = {
  items: Item[],
  selected: string,
  onChange: (value: string) => void,
};

function Select({ items, selected, onChange }: SelectProps) {
  return (
    <div className={styles.Select}>
      {items.map(item => (
        <Button
          key={item.value}
          color="info"
          outline={selected !== item.value}
          onClick={() => onChange(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

Select.defaultProps = {
  onChange: () => {},
};

export default Select;