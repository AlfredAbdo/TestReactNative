import { requireNativeView } from 'expo';
import { type PrimitiveBaseProps } from '@expo/ui/jetpack-compose';
import { createViewModifierEventListener } from '@expo/ui/jetpack-compose/modifiers';
import * as React from 'react';

export interface SessionHandlerComposeViewProps extends PrimitiveBaseProps {
  title: string;
  children?: React.ReactNode;
}

const NativeSessionHandlerComposeView = requireNativeView<SessionHandlerComposeViewProps>(
  'SessionHandler',
  'SessionHandlerComposeView'
);

export default function SessionHandlerComposeView({
  modifiers,
  ...rest
}: SessionHandlerComposeViewProps) {
  return (
    <NativeSessionHandlerComposeView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
