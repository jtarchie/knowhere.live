import { FormSchema, FormValues } from "./types";
import { RefCallback } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { String } from "./inputs/string";
import { Text } from "./inputs/text";
import { Checkbox } from "./inputs/checkbox";
import { Area } from "./inputs/area";
import { Address } from "./inputs/address";
import { Range } from "./inputs/range";

interface FormProps {
  className: string;
  onReset?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => void;
  schema: FormSchema;
  values: FormValues;
}

const componentMap = {
  string: String,
  text: Text,
  checkbox: Checkbox,
  area: Area,
  address: Address,
  range: Range,
};

function Form({
  className = "",
  onReset = () => {},
  onSubmit = () => {},
  schema = [],
  values: initialValues = {},
}: FormProps) {
  const formRef = useRef<HTMLFormElement>();
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const onSubmitCallback = useCallback((event: SubmitEvent) => {
    event.stopPropagation();
    const entries = Object.fromEntries(
      new FormData(formRef.current),
    ) as FormValues;
    onSubmit(entries);
    event.preventDefault();
  }, [schema, onSubmit]);

  const onResetCallback = useCallback((event: Event) => {
    event.preventDefault();
    setValues({});
    onReset({});
  }, [schema, onReset]);

  return (
    <form
      className={className}
      ref={formRef as unknown as RefCallback<HTMLFormElement>}
      onSubmit={onSubmitCallback}
      onReset={onResetCallback}
    >
      {schema.map((field, index) => {
        const Component = componentMap[field.type];
        const value = values[field.name];
        return (
          <Component
            key={index}
            index={index}
            field={field}
            value={value}
          />
        );
      })}
      <div class="flex justify-center mt-4 space-x-4">
        <button type="submit" class="btn btn-primary btn-lg">
          Apply
        </button>
        <button type="reset" class="btn btn-secondary btn-lg">
          Reset
        </button>
      </div>
    </form>
  );
}

export { Form };
