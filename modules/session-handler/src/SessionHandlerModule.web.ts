import { NativeModule, registerWebModule } from "expo";

import { SessionHandlerModuleEvents } from "./SessionHandler.types";

const TOKEN_KEY = "session_token";

class SessionHandlerModule extends NativeModule<SessionHandlerModuleEvents> {
  // PI = Math.PI;
  /* hello() {
    return "Hello world! 👋";
  } */
  /* async setValueAsync(value: string): Promise<void> {
    this.emit("onChange", { value });
  } */

  async setToken(token: string): Promise<void> {
    if (typeof window === "undefined") return; // Next.js / SSR safety check
    localStorage.setItem(TOKEN_KEY, token);
  }

  async getToken(): Promise<string> {
    if (typeof window === "undefined") return ""; // Next.js / SSR safety check
    return localStorage.getItem(TOKEN_KEY) ?? "";
  }

  async clearToken(): Promise<void> {
    if (typeof window === "undefined") return; // Next.js / SSR safety check
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default registerWebModule(SessionHandlerModule, "SessionHandlerModule");
