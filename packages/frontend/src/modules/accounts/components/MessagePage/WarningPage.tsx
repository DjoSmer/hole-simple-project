import React, { FC } from 'react';
import { MessagePage } from './MessagePage';

interface WarningPageProps {
  heading: string;
  message?: string;
}

export const WarningPage: FC<WarningPageProps> = ({ heading, message }) => {
  return <MessagePage heading={heading}>{message}</MessagePage>;
};
