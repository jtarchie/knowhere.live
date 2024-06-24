import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

class Editor {
  editor: EditorView;
  element: Element;

  constructor(element: Element) {
    this.element = element;
    this.editor = new EditorView({
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        javascript(),
      ],
      parent: element,
    });
  }

  get source(): string {
    return this.editor.state.doc.toString();
  }

  set source(code: string) {
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: code,
      },
    });
  }

  toggle() {
    this.element.classList.toggle("hidden");
  }
}

export { Editor };
