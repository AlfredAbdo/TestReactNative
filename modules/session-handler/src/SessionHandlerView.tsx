import { requireNativeView } from 'expo';
import * as React from 'react';

import { SessionHandlerViewProps } from './SessionHandler.types';

const NativeView: React.ComponentType<SessionHandlerViewProps> = requireNativeView('SessionHandler');

export default function SessionHandlerView(props: SessionHandlerViewProps) {
  return <NativeView {...props} />;
}
