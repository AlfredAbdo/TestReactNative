package com.anonymous.modules.sessionhandler

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.ui.ExpoUIView
import expo.modules.kotlin.records.recordFromMap
import expo.modules.ui.ModifierRegistry
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

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

        //TODO below is a mess; try to see how Coroutine marker works, because the documentations are all over the place

        AsyncFunction("setToken") { token: String, promise: Promise ->
            CoroutineScope(Dispatchers.IO).launch {
                context.dataStore.edit { preferences ->
                    preferences[tokenKey] = token
                }
                promise.resolve(Unit)
            }
        }

        AsyncFunction("getToken") { promise: Promise ->
            CoroutineScope(Dispatchers.IO).launch {
                promise.resolve(context.dataStore.data.first()[tokenKey].orEmpty())
            }
        }

        AsyncFunction("clearToken") { promise: Promise ->
            CoroutineScope(Dispatchers.IO).launch {
                context.dataStore.edit { preferences ->
                    preferences.remove(tokenKey)
                }
                promise.resolve(Unit)
            }
        }
    }

    private val context: Context
        get() = requireNotNull(appContext.reactContext) { "Android Context is not available" }
}
