import { InputProps } from "../types";

function Text({ index, field, value }: InputProps) {
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
        value={value || defaultValue}
      >
      </textarea>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Text };
