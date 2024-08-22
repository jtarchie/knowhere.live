import { useEffect, useState } from "preact/hooks";
import { InputProps } from "../types";

interface AreaPayload {
  name: string;
  slug: string;
  bounds: number[][];
}

function Area({ index, field, value }: InputProps) {
  const [areas, setAreas] = useState<AreaPayload[]>([]);
  const defaultValue = field.defaultValue || "";

  useEffect(() => {
    fetch("/proxy/api/areas", { method: "GET" })
      .then((response) => response.json())
      .then((payload) => setAreas(payload.areas))
      .catch((err) => console.log("could not load areas", err));
  }, []);

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <select
        className="select select-bordered select-lg select-primary w-full"
        name={field.name}
        id={field.name}
      >
        {areas.map((area) => {
          return (
            <option
              value={area.slug}
              selected={area.slug == value || area.slug == defaultValue}
            >
              {area.name}
            </option>
          );
        })}
      </select>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Area };
