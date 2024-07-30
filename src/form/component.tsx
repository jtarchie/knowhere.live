import { RefCallback } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { FormSchema, FormValues } from "./types";

interface Prefix {
  name: string;
  slug: string;
  bounds: number[][];
}

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

  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  useEffect(() => {
    fetch("/proxy/api/prefixes", { method: "GET" })
      .then((response) => response.json())
      .then((payload) => setPrefixes(payload.prefixes))
      .catch((err) => console.log("could not load prefixes", err));
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
                <label className="label" for={field.name}>
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <input
                  className="input input-bordered input-lg"
                  id={field.name}
                  name={field.name}
                  onChange={onChangeCallback}
                  placeholder={field.placeholder}
                  type="text"
                  value={value}
                />
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "text" && (
              <>
                <label className="label" for={field.name}>
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <textarea
                  className="textarea textarea-bordered textarea-lg"
                  id={field.name}
                  name={field.name}
                  onChange={onChangeCallback}
                  placeholder={field.placeholder}
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
                <label className="label cursor-pointer" for={field.name}>
                  <span className="label-text text-lg">{field.label}</span>
                  <input
                    checked={value == values[field.name].toString()}
                    className="checkbox checkbox-lg"
                    id={field.name}
                    name={field.name}
                    onChange={onChangeCallback}
                    type="checkbox"
                    value={value}
                  />
                </label>
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "prefix" && (
              <>
                <label className="label" for={field.name}>
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <select
                  className="select select-bordered select-lg w-full"
                  name={field.name}
                  id={field.name}
                  onChange={onChangeCallback}
                >
                  {prefixes.map((prefix) => {
                    return (
                      <option
                        value={prefix.slug}
                        selected={prefix.slug == value}
                      >
                        {prefix.name}
                      </option>
                    );
                  })}
                </select>
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
