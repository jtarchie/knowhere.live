import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

interface AreaPayload {
  name: string;
  slug: string;
  bounds: number[][];
}

function Area({ index, field }: InputProps) {
  const { register, setValue, getValues } = useFormContext(); // UseFormContext to access form methods
  const [areas, setAreas] = useState<AreaPayload[]>([]);

  useEffect(() => {
    fetch("/proxy/api/areas", { method: "GET" })
      .then((response) => response.json())
      .then((payload) => setAreas(payload.areas))
      .catch((err) => console.log("could not load areas", err));
  }, []);

  useEffect(() => {
    setValue(field.name, getValues(field.name) || field.defaultValue);
  }, [areas]);

  return (
    <div key={index} className="form-control">
      <label className="fieldset-label" htmlFor={field.name}>
        {field.label}
      </label>
      {areas.length === 0
        ? <div className="skeleton h-16 w-full"></div>
        : (
          <select
            {...register(field.name)}
            className="select select-bordered select-lg select-primary w-full"
            id={field.name}
          >
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        )}
      {field.hint && <p className="label-text-alt">{field.hint}</p>}
    </div>
  );
}

export { Area };
