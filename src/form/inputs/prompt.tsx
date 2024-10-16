import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

function Prompt({ index, field }: InputProps) {
  if (field.type !== "prompt") return null;

  const { register } = useFormContext(); // Access the form methods

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered textarea-lg textarea-primary"
        id={field.name}
        placeholder={field.placeholder}
        autoComplete="off"
        {...register(field.name, {
          minLength: field.minLength || 0,
          maxLength: field.maxLength,
        })}
      >
      </textarea>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Prompt };
