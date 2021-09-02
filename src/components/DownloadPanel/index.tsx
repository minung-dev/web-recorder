import React, { useState } from 'react';
import styles from './styles.module.css';

import Section from '../Section';
import Button from '../Button';
import Select from '../Select';

import classnames from 'classnames';

const FORMAT_ITEMS = [{
  name: '비디오 (WEBM)',
  value: 'webm',
}, {
  name: 'GIF',
  value: 'gif',
}, {
  name: '비디오 (MP4)',
  value: 'mp4',
}];

type DownloadPanelProps = {
  open: boolean,
  onDownloadClick: (type: string) => Promise<void>,
};
function DownloadPanel({ open, onDownloadClick }: DownloadPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [format, setFormat] = useState(FORMAT_ITEMS[0].value);

  const handleDownloadClick = async () => {
    setIsLoading(true);
    await onDownloadClick(format);
    setIsLoading(false);
  };

  return (
    <Section className={classnames(styles.DownloadPanel, open && styles.open)}>
      <div className="field">
        <label className="label">파일 포멧</label>
        <Select items={FORMAT_ITEMS} selected={format} onChange={setFormat} />
        <p className="help">다운로드할 파일의 포멧을 선택합니다.</p>
      </div>
      <Button color="info" loading={isLoading} onClick={handleDownloadClick}>다운로드</Button>
    </Section>
  );
}

DownloadPanel.defaultProps = {
  open: false,
  onDownloadClick: () => {},
};

export default DownloadPanel;