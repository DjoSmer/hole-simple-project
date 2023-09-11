import React, { PropsWithChildren, useContext } from 'react';
import { Divider } from '@mui/material';
import { CollectionControl } from './types';
import { CollectionContext } from './CollectionContext';
import { CollectionFormButtons } from './CollectionFormButtons';

export interface CollectionFormProps {
  disabledDone?: boolean;
  onDone: (control: CollectionControl) => void;
  onClose?: () => void;
  disableHeaderDivider?: boolean;
}

export const CollectionForm: React.FC<PropsWithChildren<CollectionFormProps>> = (props) => {
  const { disabledDone = false, onDone, onClose = () => {}, children } = props;

  const control = useContext(CollectionContext);

  const handleDoneClick = () => {
    onDone(control);
  };

  const handleCloseClick = () => {
    onClose();
    control.close();
  };

  return (
    <>
      {children}
      <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
      <CollectionFormButtons
        disabledDone={disabledDone}
        onDone={handleDoneClick}
        onCancel={handleCloseClick}
      />
    </>
  );
};
