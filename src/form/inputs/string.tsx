import { InputProps } from "../types";

function String({ index, field, value }: InputProps) {
  if (field.type !== "string") return null;
  const defaultValue = field.defaultValue || "";
  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <input
        className="input input-bordered input-lg input-primary"
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        type="search"
        value={value || defaultValue}
        autoComplete="false"
        minLength={field.minLength}
        maxLength={field.maxLength}
        pattern={field.pattern}
      />
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { String };