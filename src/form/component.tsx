import { RefCallback } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { FormSchema, FormValues } from "./types";

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
          <div key={index} className="form-control">
            {field.type === "string" && (
              <>
                <label className="label">
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="input input-bordered input-lg"
                  placeholder={field.placeholder}
                  onChange={onChangeCallback}
                  value={value}
                />
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "text" && (
              <>
                <label className="label">
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <textarea
                  name={field.name}
                  className="textarea textarea-bordered textarea-lg"
                  placeholder={field.placeholder}
                  onChange={onChangeCallback}
                  value={value}
                >
                </textarea>
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "checkbox" && (
              <>
                <label className="label cursor-pointer">
                  <span className="label-text text-lg">{field.label}</span>
                  <input
                    type="checkbox"
                    name={field.name}
                    className="checkbox checkbox-lg"
                    onChange={onChangeCallback}
                    value={value}
                    checked={value == values[field.name].toString()}
                  />
                </label>
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
          </div>
        );
      })}
    </form>
  );
}

export { Form };
