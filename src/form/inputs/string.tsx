import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

function String({ index, field }: InputProps) {
  if (field.type !== "string") return null;

  const { register } = useFormContext(); // Access the form methods

  return (
    <div key={index} className="form-control">
      <label className="label" htmlFor={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <input
        className="input input-bordered input-lg input-primary"
        id={field.name}
        placeholder={field.placeholder}
        type="text"
        autoComplete="off"
        {...register(field.name, {
          minLength: field.minLength || 0,
          maxLength: field.maxLength,
          pattern: field.pattern ? new RegExp(field.pattern) : undefined,
        })}
      />
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { String };
