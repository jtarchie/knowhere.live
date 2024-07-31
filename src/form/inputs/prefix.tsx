import { useEffect, useState } from "preact/hooks";
import { Input } from "../types";

interface Prefix {
  name: string;
  slug: string;
  bounds: number[][];
}

function Prefix({ index, field, onChange, value }: Input) {
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  useEffect(() => {
    fetch("/proxy/api/prefixes", { method: "GET" })
      .then((response) => response.json())
      .then((payload) => setPrefixes(payload.prefixes))
      .catch((err) => console.log("could not load prefixes", err));
  }, []);

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <select
        className="select select-bordered select-lg w-full"
        name={field.name}
        id={field.name}
        onChange={onChange}
      >
        {prefixes.map((prefix) => {
          return (
            <option
              value={prefix.slug}
              selected={prefix.slug == value}
            >
              {prefix.name}
            </option>
          );
        })}
      </select>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Prefix };
