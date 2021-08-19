import React from 'react';

import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactChild,
  className?: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className={classNames(className, 'button is-primary is-fullwidth')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
};

export default Button;