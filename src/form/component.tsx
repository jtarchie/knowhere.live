import { Field, FormValues, InputProps } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import { Address } from "./inputs/address";
import { Area } from "./inputs/area";
import { Checkbox } from "./inputs/checkbox";
import { Prompt } from "./inputs/prompt";
import { Range } from "./inputs/range";
import { String } from "./inputs/string";
import { Text } from "./inputs/text";
import { Runtime } from "../render/manager";
import { useRef } from "preact/hooks";

interface FormProps {
  className: string;
  onReset?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => void;
  runtime: Runtime;
}

const componentMap: {
  [key: string]: ((props: InputProps) => JSX.Element | null) & {
    onSubmit?: (field: Field, data: FormValues) => void;
  };
} = {
  address: Address,
  area: Area,
  checkbox: Checkbox,
  prompt: Prompt,
  range: Range,
  string: String,
  text: Text,
};

function Form({
  className = "",
  onReset = () => {},
  onSubmit = () => {},
  runtime: { manifest: { form: schema }, values },
}: FormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Initialize react-hook-form with default values
  const defaultValues = schema.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }
    return acc;
  }, {} as FormValues);
  const methods = useForm({ defaultValues: defaultValues, values: values });
  const { handleSubmit, reset } = methods;

  const onSubmitCallback = async (data: FormValues) => {
    dialogRef.current?.showModal();
    await Promise.all(
      schema.map(async (field) => {
        const component = componentMap[field.type];
        if (component?.onSubmit) {
          await component.onSubmit(field, data);
        }
      }),
    );
    onSubmit(data);
    dialogRef.current?.close();
  };

  const onResetCallback = () => {
    reset();
    onReset({});
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={className}
          onSubmit={handleSubmit(onSubmitCallback)}
          onReset={onResetCallback}
        >
          {schema.map((field, index) => {
            const Component = componentMap[field.type];
            return <Component key={index} index={index} field={field} />;
          })}

          <div className="flex justify-center mt-4 space-x-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Apply
            </button>
            <button type="reset" className="btn btn-secondary btn-lg">
              Reset
            </button>
          </div>
        </form>
      </FormProvider>
      <dialog class="modal" ref={dialogRef}>
        <div class="modal-box">
          <h3 class="text-lg font-bold">Loading</h3>
          <p class="py-4">
            <span class="loading loading-ball loading-xs"></span>
            <span class="loading loading-ball loading-sm"></span>
            <span class="loading loading-ball loading-md"></span>
            <span class="loading loading-ball loading-lg"></span>
          </p>
        </div>
      </dialog>
    </>
  );
}

export { Form };
