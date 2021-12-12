import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import classnames from 'classnames';

type ProgressProps = {
  on: boolean,
  max: number // max seconds
  // onMaxiumProgress: () => void,
};

function Progress({
  on,
  max,
  // onMaximumProgress,
}: ProgressProps) {
  const [isMax, setIsMax] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (on === false) {
      setValue(0);
      setIsMax(false);
      return;
    }

    const intervalId = setInterval(() => {
      setValue(v => v + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [on]);

  useEffect(() => {
    if (value >= max) {
      setIsMax(true);
      // onMaximumProgress();
    }
  }, [value]);

  return (
    <div className={styles.Progress}>
      <span className={classnames(styles.Progress__text, 'is-size-7', 'has-text-weight-medium', isMax && 'has-text-white')}>{value}초 / 최대 {max}초</span>
      <progress className={classnames('progress', 'is-large', isMax ? 'is-danger' : 'is-primary')} value={value} max={max} />
    </div>
  );
}

Progress.defaultProps = {
  on: false,
  max: 600,
  // onMaximumProgress: () => {},
};

export default Progress;