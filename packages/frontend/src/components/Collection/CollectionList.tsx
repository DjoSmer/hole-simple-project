import React, { PropsWithChildren, useMemo, useState } from 'react';
import { Button } from '~/components';
import { Divider } from '@mui/material';
import { CollectionContext } from './CollectionContext';
import { CollectionControl } from './types';

export interface CollectionListProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  renderCollectionForm: (params: { control: CollectionControl }) => React.ReactNode;
  addCollectionLabel: string;
  additionalCollectionLabel: string;
  disableHeaderDivider?: boolean;
}

export function CollectionList(props: PropsWithChildren<CollectionListProps>) {
  const {
    addCollectionLabel,
    additionalCollectionLabel,
    renderCollectionForm,
    disableHeaderDivider = false,
  } = props;

  const [defaultOpen, setDefaultOpen] = useState(false);

  const { open = defaultOpen, setOpen = setDefaultOpen } = props;

  const control = useMemo<CollectionControl>(
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    [setOpen]
  );

  const children = React.Children.toArray(props.children);

  return (
    <CollectionContext.Provider value={control}>
      <>
        {children.length ? (
          <>
            {!disableHeaderDivider && <Divider sx={{ mb: 1 }} />}
            {children}
          </>
        ) : null}
        <Divider sx={{ mb: 1, borderStyle: 'dashed' }} />
        {open ? (
          renderCollectionForm({ control: control })
        ) : (
          <Button variant="text" onClick={() => control.open()}>
            {children.length ? additionalCollectionLabel : addCollectionLabel}
          </Button>
        )}
      </>
    </CollectionContext.Provider>
  );
}
