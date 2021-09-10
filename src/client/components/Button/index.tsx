import React from 'react';

import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactChild,
  className?: string,
  color?: string,
  outline?: boolean,
  loading?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
};

function Button({ children, className, color, outline, loading, onClick }: ButtonProps) {
  return (
    <button className={classNames(className, `button is-${color} is-fullwidth`, outline && 'is-outlined', loading && 'is-loading')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'primary',
  onClick: () => {},
};

export default Button;