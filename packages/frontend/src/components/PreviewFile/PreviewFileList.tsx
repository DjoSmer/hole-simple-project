import React from 'react';
import { Stack } from '@mui/material';
import { FileModel } from '~/types';
import { PreviewFileItem } from './PreviewFileItem';

export interface DocumentListProps {
  files: FileModel[];
}

export const PreviewFileList = (props: DocumentListProps) => {
  const { files } = props;

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ borderLeft: '1px solid', borderColor: 'divider', ml: 2, pl: 2 }}
    >
      {files.map((file) => (
        <PreviewFileItem key={file.outsideId} file={file} />
      ))}
    </Stack>
  );
};
