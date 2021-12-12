import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import classnames from 'classnames';

type ProgressProps = {
  max: number // max seconds
  onMaxiumProgress: () => void,
};

function Progress({
  max,
  onMaxiumProgress,
}: ProgressProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (value === max) {
        clearInterval(intervalId);
        onMaxiumProgress();
      }

      setValue(v => v + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.Progress}>
      <span className={classnames(styles.Progress__text, 'is-size-7', 'has-text-weight-medium')}>{value}초 / 최대 {max}초</span>
      <progress className="progress is-primary is-large" value={value} max={max} />
    </div>
  );
}

Progress.defaultProps = {
  max: 600,
  onMaxiumProgress: () => {},
};

export default Progress;