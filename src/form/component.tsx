import { FormSchema, FormValues } from "./types";
import { RefCallback } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { String } from "./inputs/string";
import { Text } from "./inputs/text";
import { Checkbox } from "./inputs/checkbox";
import { Prefix } from "./inputs/prefix";
import { Address } from "./inputs/address";

interface FormProps {
  className: string;
  onChange?: (values: FormValues) => void;
  onReset?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => void;
  schema: FormSchema;
  values: FormValues;
}

function Form(
  {
    className = "",
    onChange = () => {},
    onReset = () => {},
    onSubmit = () => {},
    schema = [],
    values: initialValues = {},
  }: FormProps,
) {
  const formRef = useRef<HTMLFormElement>();
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const onChangeCallback = useCallback(() => {
    const entries = Object.fromEntries(new FormData(formRef.current));
    onChange(entries);
  }, [schema, onChange]);

  const onSubmitCallback = useCallback((event: SubmitEvent) => {
    event.stopPropagation();
    const entries = Object.fromEntries(new FormData(formRef.current));
    onSubmit(entries);
    event.preventDefault();
  }, [schema, onChange]);

  const onResetCallback = useCallback((event: Event) => {
    event.preventDefault();
    const resetValues = schema.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {} as FormValues);
    setValues(resetValues);
    onReset(resetValues);
  }, [schema, onChange]);

  return (
    <form
      className={className}
      ref={formRef as unknown as RefCallback<HTMLFormElement>}
      onSubmit={onSubmitCallback}
      onReset={onResetCallback}
    >
      {schema.map((field, index) => {
        const value = (values[field.name] || field.defaultValue || "")
          .toString();
        return (
          <>
            {field.type === "string" && (
              <String
                index={index}
                field={field}
                onChange={onChangeCallback}
                value={value}
              />
            )}
            {field.type === "text" && (
              <Text
                index={index}
                field={field}
                onChange={onChangeCallback}
                value={value}
              />
            )}
            {field.type === "checkbox" && (
              <Checkbox
                index={index}
                field={field}
                onChange={onChangeCallback}
                value={value}
              />
            )}
            {field.type === "prefix" && (
              <Prefix
                index={index}
                field={field}
                onChange={onChangeCallback}
                value={value}
              />
            )}
            {field.type === "address" && (
              <Address
                index={index}
                field={field}
                onChange={onChangeCallback}
                address={{
                  full_address: (values[`${field.name}_full_address`] ||
                    "200 E Colfax Ave, Denver, CO 80203").toString(),
                  lat: Number(values[`${field.name}_lat`] || 39.7401684),
                  lon: Number(values[`${field.name}_lon`] || -104.9894902),
                }}
              />
            )}
          </>
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
