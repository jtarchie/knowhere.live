import { InputProps } from "../types";

function Checkbox({ index, field, values }: InputProps) {
  const value = values[field.name];
  const defaultValue = field.defaultValue || "0";
  return (
    <div key={index} className="form-control">
      <label className="label cursor-pointer" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
        <input
          checked={value == "1" || defaultValue == "1"}
          className="checkbox checkbox-lg checkbox-primary"
          id={field.name}
          name={field.name}
          type="checkbox"
          value="1"
        />
      </label>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Checkbox };
