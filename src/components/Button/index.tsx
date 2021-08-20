import React from 'react';

import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactChild,
  className?: string,
  color?: string,
  outline?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
};

function Button({ children, className, color, outline, onClick }: ButtonProps) {
  return (
    <button className={classNames(className, `button is-${color} is-fullwidth`, outline && 'is-outlined')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'primary',
  onClick: () => {},
};

export default Button;