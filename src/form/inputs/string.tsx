import { Input } from "../types";

function String({ index, field, onChange, value }: Input) {
  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <input
        className="input input-bordered input-lg"
        id={field.name}
        name={field.name}
        onChange={onChange}
        placeholder={field.placeholder}
        type="text"
        value={value}
      />
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { String };
