import { InputProps } from "../types";

function Prompt({ index, field, values }: InputProps) {
  if (field.type !== "prompt") return null;
  const value = values[field.name] as string;

  const defaultValue = field.defaultValue || "";
  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered textarea-lg textarea-primary"
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        autoComplete="false"
        minLength={field.minLength}
        maxLength={field.maxLength}
        value={value || defaultValue}
      >
      </textarea>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Prompt };
