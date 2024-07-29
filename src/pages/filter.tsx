import { FormValues } from "../form/types";
import { BottomNav } from "../components/bottom-nav";
import { Manager } from "../render/manager";
import { Form } from "../form/component";

function FilterPage({}: { path?: string }) {
  const manager = new Manager();
  const { filter, about, filterValues } = manager.load();
  const onChange = (values: FormValues) => manager.persistFilterValues(values);

  return (
    <div class="h-screen flex flex-col p-4">
      {about != "" && (
        <>
          <h2 class="text-2xl">About</h2>
          <p class="text-base">{about}</p>
        </>
      )}
      <Form
        schema={filter}
        values={filterValues}
        onChange={onChange}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
      />
      <BottomNav />
    </div>
  );
}

export { FilterPage };
