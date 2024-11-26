import { InputProps } from "../types";
import { useFormContext } from "react-hook-form";

function Checkbox({ index, field }: InputProps) {
  const { register } = useFormContext();

  return (
    <div key={index} className="form-control">
      <label className="label cursor-pointer" htmlFor={field.name}>
        <span className="label-text text-lg">{field.label}</span>
        <input
          className="checkbox checkbox-lg checkbox-primary"
          id={field.name}
          type="checkbox"
          {...register(field.name) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
      </label>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Checkbox };
