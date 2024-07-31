import { FormSchema, FormValues } from "./types";
import { RefCallback } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { String } from "./inputs/string";
import { Text } from "./inputs/text";
import { Checkbox } from "./inputs/checkbox";
import { Prefix } from "./inputs/prefix";
import { Address } from "./inputs/address";

function Form(
  { schema = [], className = "", onChange = () => {}, values = {} }: {
    schema: FormSchema;
    className: string;
    values: FormValues;
    onChange: (values: FormValues) => void;
  },
) {
  const formRef = useRef<HTMLFormElement>();

  const onChangeCallback = useCallback(() => {
    const entries = Object.fromEntries(new FormData(formRef.current));
    onChange(entries);
  }, []);

  return (
    <form
      className={className}
      ref={formRef as unknown as RefCallback<HTMLFormElement>}
    >
      {schema.map((field, index) => {
        const value = (values[field.name] || field.defaultValue || "")
          ?.toString();
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
                value={value}
              />
            )}
          </>
        );
      })}
    </form>
  );
}

export { Form };
