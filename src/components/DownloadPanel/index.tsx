import React, { useState } from 'react';
import styles from './styles.module.css';

import Button from '../Button';

import classnames from 'classnames';

type DownloadPanelProps = {
  onDownloadClick: (type: string) => void | Promise<void>,
};

function DownloadPanel({ onDownloadClick }: DownloadPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownloadClick = async () => {
    setIsLoading(true);
    await onDownloadClick('gif');
    setIsLoading(false);
  };

  return (
    <section className={classnames(styles.DownloadPanel, 'section py-3')}>
      <div className="field">
        <label className="label">파일 포멧</label>
        <div className="control is-flex">
          <Button color="info">비디오</Button>
          <Button color="info" outline className="ml-3">GIF</Button>
        </div>
        <p className="help">다운로드할 파일의 포멧을 선택합니다.</p>
      </div>
      <Button color="info" loading={isLoading} onClick={handleDownloadClick}>다운로드</Button>
    </section>
  );
}

DownloadPanel.defaultProps = {
  onDownloadClick: () => {},
};

export default DownloadPanel;