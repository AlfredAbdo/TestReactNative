import { SharedObject, useReleasingSharedObject } from 'expo-modules-core';

import SessionHandlerModule from './SessionHandlerModule';

export declare class SessionHandlerModuleSharedObject extends SharedObject {
  count: number;
}

/**
 * Creates a new SessionHandlerModuleSharedObject instance.
 * You are responsible for releasing it from memory by calling `release()` when done.
 */
export function createSessionHandlerModuleSharedObject(): SessionHandlerModuleSharedObject {
  return new SessionHandlerModule.SessionHandlerModuleSharedObject();
}

/**
 * A hook that creates a SessionHandlerModuleSharedObject instance and automatically
 * releases it when the component unmounts.
 */
export function useSessionHandlerModuleSharedObject(): SessionHandlerModuleSharedObject {
  return useReleasingSharedObject(() => new SessionHandlerModule.SessionHandlerModuleSharedObject(), []);
}
