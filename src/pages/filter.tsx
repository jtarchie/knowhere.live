import { FormValues } from "../form/types";
import { BottomNav } from "../components/bottom-nav";
import { Manager, Runtime } from "../render/manager";
import { Form } from "../form/component";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

function FilterPage(
  { manifestName }: { path?: string; manifestName?: string },
) {
  const manager = new Manager();
  const [runtime, setRuntime] = useState<Runtime>();

  const onSubmit = (values: FormValues) => {
    manager.persistFilterValues(values);
    route(`/beta/${manifestName}/map`);
  };

  const onReset = (values: FormValues) => {
    manager.persistFilterValues(values);
  };

  useEffect(() => {
    const runtime = manager.load(manifestName);
    setRuntime(runtime);
  }, [manifestName]);

  if (!runtime) {
    return (
      <div class="h-screen flex flex-col">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const manifest = runtime.manifest;
  return (
    <div class="h-screen flex flex-col">
      {manifest.about && (
        <div class="p-4">
          <h2 class="text-2xl">About</h2>
          <p class="text-base">{manifest.about}</p>
        </div>
      )}
      <Form
        runtime={runtime}
        onSubmit={onSubmit}
        onReset={onReset}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
      />
      <BottomNav manifestName={manifestName} />
    </div>
  );
}

export { FilterPage };
