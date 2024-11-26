import { InputProps } from "../types";
import { useFormContext } from "react-hook-form";

function Range({ index, field }: InputProps) {
  if (field.type !== "range") return null;

  const { register, watch } = useFormContext();
  const currentValue = watch(field.name);

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">
          {field.label}: {currentValue}
        </span>
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
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Range };
