import SwiftUI
import ExpoModulesCore
import ExpoUI

final class SessionHandlerSwiftUIViewProps: UIBaseViewProps {
  @Field var title: String = ""
}

struct SessionHandlerSwiftUIView: ExpoSwiftUI.View {
  @ObservedObject public var props: SessionHandlerSwiftUIViewProps

  var body: some View {
    VStack {
      Text(props.title)
        .font(.headline)
      Children()
    }
  }
}
