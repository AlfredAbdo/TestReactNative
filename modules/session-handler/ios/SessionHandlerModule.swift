import ExpoModulesCore
import ExpoUI

public class SessionHandlerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SessionHandler")


    let tokenKey = "session_token"



    // Events("onChange")

    /* Constant("PI") {
      Double.pi
    } */

    /* Function("hello") {
      return "Hello world! 👋"
    } */

    /* AsyncFunction("setValueAsync") { (value: String) in
      self.sendEvent("onChange", [
        "value": value
      ])
    } */

    /* View(SessionHandlerView.self) {
      Events("onTap")
    } */

    /* Class(SessionHandlerModuleSharedObject.self) {
      Constructor { () -> SessionHandlerModuleSharedObject in
        return SessionHandlerModuleSharedObject()
      }

      Property("count") { (ref: SessionHandlerModuleSharedObject) -> Int in
        return ref.count
      }
      .set { (ref: SessionHandlerModuleSharedObject, count: Int) in
        ref.count = count
      }
    } */

    //ExpoUIView(SessionHandlerSwiftUIView.self)

    /* OnCreate {
      ViewModifierRegistry.register("sessionHandlerSwiftUIModifier") { params, appContext, _ in
        return try SessionHandlerSwiftUIModifier(from: params, appContext: appContext)
      }
    } */

    /* OnDestroy {
      ViewModifierRegistry.unregister("sessionHandlerSwiftUIModifier")
    } */

    AsyncFunction("setToken") { (token: String) in
      UserDefaults.standard.set(token, forKey: tokenKey)
    }

    AsyncFunction("getToken") { () in
      return UserDefaults.standard.string(forKey: tokenKey) ?? ""
    }

    AsyncFunction("clearToken") { () in
      UserDefaults.standard.removeObject(forKey: tokenKey)
    }
  }
}
