import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, IconButton } from '@mui/material';
import styled from '@mui/material/styles/styled';
import { Button } from '~/components';
import { RemoveIcon, DragIcon, EditIcon, DeleteIcon } from '~/components/icons';
import { makeDraggable } from '~/hooks';
import { Collection, CollectionControl } from './types';
import { PreviewFileList } from '../PreviewFile';
import { CollectionContext } from './CollectionContext';

export interface CollectionItemProps<T extends Collection> {
  collection: T;
  index: number;
  label?: React.ReactNode;
  caption?: string;
  onEdit?: (target: T, control: CollectionControl) => void;
  onReorder: (current: T, target: T, control: CollectionControl) => void;
  onRemoveItem: (target: T, control: CollectionControl) => void;
}

export const CollectionItemRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '2px 0',
  padding: '.25rem',
  '&.moving': {
    backgroundColor: theme.palette.action.hover,
    '*': {
      opacity: 0,
    },
  },
  '&.dragging': {
    background: theme.palette.background.paper,
    opacity: theme.palette.action.disabledOpacity,
    '.item-index': {
      opacity: 0,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const useDraggable = makeDraggable<Collection>();

export function CollectionItem<T extends Collection = Collection>(props: CollectionItemProps<T>) {
  const { collection, index, label, caption, onEdit, onReorder, onRemoveItem } = props;

  const control = useContext(CollectionContext);
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const { t } = useTranslation('users');

  const onDragStart = () => {
    setIsDrag(true);
  };
  const onDragEnd = () => {
    setIsDrag(false);
  };

  const {
    currentDrag,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragOver,
    handleMouseEnter,
    handleMouseLeave,
  } = useDraggable({
    targetDrag: collection,
    draggableRef,
    onDragOver: (current) => {
      onReorder(current as T, collection, control);
    },
    onDragEnd,
    onDragStart,
    checkEqualDrag: (c, t) => c._id !== t._id,
  });

  const handleRemoveClick = () => {
    onRemoveItem(collection, control);
  };

  const handleEditClick = () => {
    if (onEdit) onEdit(collection, control);
  };

  return (
    <CollectionItemRoot
      ref={draggableRef}
      className={currentDrag?._id && currentDrag?._id === collection._id ? 'moving' : ''}
      draggable={isDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
    >
      <IconButton
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ transform: 'rotate(90deg)', cursor: 'move' }}
      >
        <DragIcon />
      </IconButton>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography className="item-index" typography="h6" sx={{ fontSize: '1.1rem', mr: 1 }}>
          {index + 1}.
        </Typography>
        <Typography typography="h6">{label}</Typography>
        {caption && (
          <Typography color="primary" typography="subtitle1" sx={{ ml: 1 }}>
            ({caption})
          </Typography>
        )}
        {collection.files?.length ? <PreviewFileList files={collection.files} /> : null}
      </Box>
      {onEdit ? (
        <>
          <Button startIcon={<EditIcon />} variant="outlined" onClick={handleEditClick}>
            {t('editButton', 'Bearbeiten')}
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleRemoveClick}
            sx={{ minWidth: 'auto', padding: '5px', mx: 1 }}
          >
            <DeleteIcon />
          </Button>
        </>
      ) : (
        <IconButton color="error" onClick={handleRemoveClick}>
          <RemoveIcon fontSize="small" />
        </IconButton>
      )}
    </CollectionItemRoot>
  );
}
