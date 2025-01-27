import { InputProps } from "../types";
import { useFormContext } from "react-hook-form";

function Range({ index, field }: InputProps) {
  if (field.type !== "range") return null;

  const { register, watch } = useFormContext();
  const currentValue = watch(field.name);

  return (
    <div key={index} className="form-control">
      <label className="fieldset-label" htmlFor={field.name}>
        {field.label}: {currentValue}
      </label>
      <input
        className="range range-primary"
        type="range"
        id={field.name}
        min={field.min.toString()}
        max={field.max.toString()}
        step={field.step}
        {...register(field.name) as React.InputHTMLAttributes<HTMLInputElement>}
      />
      {field.hint && <p className="label-text-alt">{field.hint}</p>}
    </div>
  );
}

export { Range };
