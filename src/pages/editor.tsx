import { BottomNav } from "../components/bottom-nav";
import { javascript } from "@codemirror/lang-javascript";
import { Manager } from "../render/manager";
import { useCallback, useState } from "preact/hooks";
import CodeMirror from "@uiw/react-codemirror";

const prefersDarkMode = globalThis.matchMedia &&
  globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

function EditorPage({}: { path?: string }) {
  const manager = new Manager();
  const sourceCode = manager.fromParams();
  const [value, setValue] = useState(sourceCode);
  const onChange = useCallback((sourceCode: string) => {
    setValue(sourceCode);
    manager.toParams(sourceCode);
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
