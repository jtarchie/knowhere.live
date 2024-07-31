import { Input } from "../types";

function Text({ index, field, onChange, value }: Input) {
  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered textarea-lg"
        id={field.name}
        name={field.name}
        onChange={onChange}
        placeholder={field.placeholder}
        value={value}
      >
      </textarea>
      {field.hint && <span className="label-text-alt">{field.hint}</span>}
    </div>
  );
}

export { Text };
