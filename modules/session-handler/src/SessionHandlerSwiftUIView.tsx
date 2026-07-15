import { requireNativeView } from 'expo';
import { type CommonViewModifierProps } from '@expo/ui/swift-ui';
import { createViewModifierEventListener } from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';

export interface SessionHandlerSwiftUIViewProps extends CommonViewModifierProps {
  title: string;
  children?: React.ReactNode;
}

const NativeSessionHandlerSwiftUIView = requireNativeView<SessionHandlerSwiftUIViewProps>(
  'SessionHandler',
  'SessionHandlerSwiftUIView'
);

export default function SessionHandlerSwiftUIView({
  modifiers,
  ...rest
}: SessionHandlerSwiftUIViewProps) {
  return (
    <NativeSessionHandlerSwiftUIView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
