import { Form, FormSchema } from "../component/form";
import { BottomNav } from "../components/bottom-nav";

const schema: FormSchema = [
  {
    label: "Address",
    name: "address",
    type: "string",
    hint: "Please enter your full address.",
    placeholder: "1234 Main St",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    hint: "Provide a brief description.",
    placeholder: "Enter your description here...",
  },
  {
    label: "Subscribe",
    name: "subscribe",
    type: "checkbox",
    hint: "Check this box to subscribe to our newsletter.",
  },
];

function FilterPage({}: { path?: string }) {
  return (
    <div class="h-screen flex flex-col">
      <Form
        schema={schema}
        className="flex-1 h-full w-full p-4 overflow-y-auto"
      />
      <BottomNav />
    </div>
  );
}

export { FilterPage };
