import React from 'react';

import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactChild,
  className?: string,
  color?: string,
  outline?: boolean,
  loading?: boolean,
  block?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
};

function Button({ children, className, color, outline, block, loading, onClick }: ButtonProps) {
  return (
    <button className={classNames(className, `button is-${color}`, block && `is-fullwidth`, outline && 'is-outlined', loading && 'is-loading')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'primary',
  onClick: () => {},
  block: true,
};

export default Button;