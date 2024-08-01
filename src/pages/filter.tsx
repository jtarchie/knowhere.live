import { FormValues } from "../form/types";
import { BottomNav } from "../components/bottom-nav";
import { Manager } from "../render/manager";
import { Form } from "../form/component";
import { useEffect, useState } from "preact/hooks";
import { Manifest } from "../manifests/type";
import { route } from "preact-router";

function FilterPage(
  { manifestName }: { path?: string; manifestName?: string },
) {
  const manager = new Manager();
  const [manifest, setManifest] = useState<Manifest>({
    source: "",
    filter: [],
    filterValues: {},
    about: "",
  });
  const onSubmit = (values: FormValues) => {
    manager.persistFilterValues(values);
    route(`/beta/${manifestName}/map`);
  };

  const onReset = (values: FormValues) => {
    manager.persistFilterValues(values);
  };

  useEffect(() => {
    const manifest = manager.load(manifestName);
    setManifest(manifest);
  }, []);

  return (
    <div class="h-screen flex flex-col">
      {manifest.about != "" && (
        <>
          <h2 class="text-2xl">About</h2>
          <p class="text-base">{manifest.about}</p>
        </>
      )}
      <Form
        schema={manifest.filter}
        values={manifest.filterValues}
        onSubmit={onSubmit}
        onReset={onReset}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
      />
      <BottomNav manifestName={manifestName} />
    </div>
  );
}

export { FilterPage };
