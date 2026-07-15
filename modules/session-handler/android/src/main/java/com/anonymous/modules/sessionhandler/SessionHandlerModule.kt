package com.anonymous.modules.sessionhandler

//import expo.modules.ui.ExpoUIView
//import expo.modules.kotlin.records.recordFromMap
//import expo.modules.ui.ModifierRegistry
import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import expo.modules.kotlin.Promise
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "user_session")

class SessionHandlerModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SessionHandler")


        val tokenKey = stringPreferencesKey("session_token")


        // Events("onChange")

        /* Constant("PI") {
          Math.PI
        } */

        /* Function("hello") {
            "Hello world! 👋"
        } */

        /* AsyncFunction("setValueAsync") { value: String ->
            sendEvent(
                "onChange", mapOf(
                    "value" to value
                )
            )
        } */

        /* View(SessionHandlerView::class) {
            // Defines an event that the view can send to JavaScript.
            Events("onTap")
        } */

        /* Class(SessionHandlerModuleSharedObject::class) {
            Constructor {
                val instance = SessionHandlerModuleSharedObject(appContext)
                return@Constructor instance
            }

            Property("count")
                .get { ref: SessionHandlerModuleSharedObject ->
                    ref.count
                }
                .set { ref: SessionHandlerModuleSharedObject, count: Int ->
                    ref.count = count
                }
        } */

        /* ExpoUIView<SessionHandlerComposeViewProps>("SessionHandlerComposeView") {
            Content { props ->
                SessionHandlerComposeViewContent(props)
            }
        } */

        /* OnCreate {
            ModifierRegistry.register("sessionHandlerComposeModifier") { params, _, _, _ ->
                recordFromMap<SessionHandlerComposeModifierParams>(params).toModifier()
            }
        } */

        AsyncFunction("setToken") Coroutine { token: String ->
            withContext(Dispatchers.IO) {
                context.dataStore.edit { preferences ->
                    preferences[tokenKey] = token
                }
            }
        }

        AsyncFunction("getToken") Coroutine { ->
            withContext(Dispatchers.IO) {
                context.dataStore.data.first()[tokenKey].orEmpty()
            }
        }

        AsyncFunction("clearToken") Coroutine { ->
            withContext(Dispatchers.IO) {
                context.dataStore.edit { preferences ->
                    preferences.remove(tokenKey)
                }
            }
        }
    }

    private val context: Context
        get() = requireNotNull(appContext.reactContext) { "Android Context is not available" }
}
