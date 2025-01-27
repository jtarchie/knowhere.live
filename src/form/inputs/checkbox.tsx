import { InputProps } from "../types";
import { useFormContext } from "react-hook-form";

function Checkbox({ index, field }: InputProps) {
  const { register } = useFormContext();

  return (
    <div key={index} className="form-control">
      <label
        className="fieldset-label cursor-pointer text-lg"
        htmlFor={field.name}
      >
        <input
          className="checkbox checkbox-lg checkbox-primary"
          id={field.name}
          type="checkbox"
          {...register(field.name) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        {field.label}
      </label>
      {field.hint && <p className="label-text-alt">{field.hint}</p>}
    </div>
  );
}

export { Checkbox };
