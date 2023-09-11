import React, { FC } from 'react';
import { MessagePage, MessageButton } from './MessagePage';

interface SuccessProps {
  heading: string;
  message?: string;
  button?: MessageButton;
  loading?: boolean;
}

export const SuccessPage: FC<SuccessProps> = ({ heading, message, button, loading }) => {
  return (
    <MessagePage heading={heading} button={button} loading={loading}>
      {message}
    </MessagePage>
  );
};
