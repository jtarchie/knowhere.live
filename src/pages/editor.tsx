import { BottomNav } from "../components/bottom-nav";
import { javascript } from "@codemirror/lang-javascript";
import { Manager } from "../render/manager";
import { useCallback, useEffect, useState } from "preact/hooks";
import CodeMirror from "@uiw/react-codemirror";
import manifests from "../manifests";

const prefersDarkMode = globalThis.matchMedia &&
  globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

function EditorPage(
  { manifestName }: { path?: string; manifestName?: string },
) {
  const manager = new Manager();
  const [sourceCode, setSourceCode] = useState<string>("");

  const onChange = useCallback((sourceCode: string) => {
    setSourceCode(sourceCode);
    manager.persistSource(sourceCode);
  }, []);

  useEffect(() => {
    const { manifest: { source } } = manager.load(manifestName);
    setSourceCode(source);
  }, []);

  useEffect(() => {
    if (manifestName) {
      const prettyName = manifests[manifestName]?.about || manifestName;
      document.title = `Knowhere / ${prettyName} / Editor`;
    } else {
      document.title = "Knowhere / Editor";
    }
  }, [manifestName]);

  return (
    <div class="h-screen flex flex-col">
      <CodeMirror
        value={sourceCode}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
        extensions={[javascript()]}
        theme={prefersDarkMode ? "dark" : "light"}
        onChange={onChange}
      />
      <BottomNav manifestName={manifestName} />
    </div>
  );
}

export { EditorPage };
