import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from '@mui/material/styles/styled';
import {Button} from '~/components';

export interface CollectionFormButtonsProps {
    disabledDone?: boolean;
    onDone: () => void;
    onCancel: () => void;
}

export const Actions = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    '& > :not(:first-of-type)': {
        marginLeft: 8,
    },
});

export const CollectionFormButtons: React.FC<CollectionFormButtonsProps> = (props) => {
    const {disabledDone, onDone, onCancel} = props;
    const {t} = useTranslation('users');

    return (
        <Actions>
            <Button color="secondary" onClick={onCancel}>
                {t('cancelButton', 'Abbrechen')}
            </Button>
            <Button disabled={disabledDone} onClick={onDone}>
                {t('doneButton', 'Fertig')}
            </Button>
        </Actions>
    );
};
