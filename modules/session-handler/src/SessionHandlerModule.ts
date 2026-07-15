import { NativeModule, requireNativeModule } from "expo";

import { SessionHandlerModuleEvents } from "./SessionHandler.types";
// import type { SessionHandlerModuleSharedObject } from "./SessionHandlerModuleSharedObject";

declare class SessionHandlerModule extends NativeModule<SessionHandlerModuleEvents> {
  // PI: number;
  // hello(): string;
  // setValueAsync(value: string): Promise<void>;
  // SessionHandlerModuleSharedObject: typeof SessionHandlerModuleSharedObject;

  setToken(token: string): Promise<void>;
  getToken(): Promise<string>;
  clearToken(): Promise<void>;
}

export default requireNativeModule<SessionHandlerModule>("SessionHandler");
