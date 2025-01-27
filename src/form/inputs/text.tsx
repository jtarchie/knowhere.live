import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

function Text({ index, field }: InputProps) {
  if (field.type !== "text") return null;

  const { register } = useFormContext(); // Access the form methods

  return (
    <div key={index} className="form-control">
      <label className="fieldset-label" htmlFor={field.name}>
        {field.label}
      </label>
      <textarea
        className="textarea textarea-bordered textarea-lg textarea-primary"
        id={field.name}
        autoComplete="off"
        placeholder={field.placeholder}
        {...register(field.name, {
          minLength: field.minLength || 0,
          maxLength: field.maxLength,
        })}
      >
      </textarea>
      {field.hint && <p className="label-text-alt">{field.hint}</p>}
    </div>
  );
}

export { Text };
