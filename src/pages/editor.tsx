import { BottomNav } from "../components/bottom-nav";
import { javascript } from "@codemirror/lang-javascript";
import { Source } from "../render/source";
import { useCallback, useState } from "preact/hooks";
import CodeMirror from "@uiw/react-codemirror";

function EditorPage({}: { path?: string }) {
  const prefersDarkMode = globalThis.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

  const source = new Source();
  const sourceCode = source.fromParams();
  const [value, setValue] = useState(sourceCode);
  const onChange = useCallback((sourceCode: string) => {
    setValue(sourceCode);
    source.toParams(sourceCode);
  }, []);

  return (
    <div class="h-screen flex flex-col">
      <CodeMirror
        value={value}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
        extensions={[javascript()]}
        theme={prefersDarkMode ? "dark" : "light"}
        onChange={onChange}
      />
      <BottomNav />
    </div>
  );
}

export { EditorPage };
