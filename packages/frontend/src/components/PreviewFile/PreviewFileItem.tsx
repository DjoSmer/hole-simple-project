import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { FileModel } from '~/types';
import { FileIcon } from '../icons';

interface DocumentFileItemProps {
  file: FileModel;
}

export const PreviewFileItem = (props: DocumentFileItemProps) => {
  const { file } = props;

  return (
    <Tooltip title={file.title || ''}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FileIcon />
      </Box>
    </Tooltip>
  );
};
