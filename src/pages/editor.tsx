import { BottomNav } from "../components/bottom-nav";
import { Editor } from "../render/editor";
import { Source } from "../render/source";
import { useEffect, useRef } from "preact/hooks";

function EditorPage({}: { path?: string }) {
  const editorElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = new Editor(editorElement.current as HTMLDivElement);

    const source = new Source("source");
    const sourceCode = source.fromParams();
    editor.source = sourceCode;
  });
  return (
    <div class="h-screen flex flex-col">
      <div
        id="content"
        class="flex-1 h-full w-full p-4 overflow-y-auto"
        ref={editorElement}
      >
      </div>
      <BottomNav />
    </div>
  );
}

export { EditorPage };
