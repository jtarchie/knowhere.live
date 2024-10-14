import { InputProps } from "../types";
import { useEffect, useState } from "preact/hooks";

function Range({ index, field, values }: InputProps) {
  if (field.type !== "range") return null;
  const value = values[field.name] as string;
  const defaultValue = field.defaultValue || "";
  const [currentValue, setCurrentValue] = useState(value || defaultValue);

  useEffect(() => {
    setCurrentValue(value || defaultValue);
  }, [value, field]);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setCurrentValue(target.value);
  };

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">
          {field.label}: {currentValue}
        </span>
      </label>
      <input
        className="range range-primary"
        id={field.name}
        name={field.name}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={currentValue}
        onInput={handleChange}
      />
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Range };
