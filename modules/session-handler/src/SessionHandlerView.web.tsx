import * as React from 'react';

import { SessionHandlerViewProps } from './SessionHandler.types';

export default function SessionHandlerView(props: SessionHandlerViewProps) {
  return (
    <div
      style={{
        backgroundColor: '#aabbcc',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => props.onTap({ nativeEvent: {} })}>
      <span>SessionHandler - native view</span>
      <span>Tap the view to emit a view event</span>
    </div>
  );
}
