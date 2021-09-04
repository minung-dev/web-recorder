import React from 'react';

type Item = {
  name: string,
  value: string,
};

type SelectProps = {
  items: Item[],
  selected: string,
  onChange: (value: string) => void,
};

function Select({ items, onChange }: SelectProps) {
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className="select is-info is-fullwidth">
      <select onChange={handleChange}>
        {items.map(item => (
          <option value={item.value}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}

Select.defaultProps = {
  onChange: () => {},
};

export default Select;