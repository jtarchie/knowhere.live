type FieldType = "string" | "text" | "checkbox";

interface Field {
  label: string;
  name: string;
  type: FieldType;
  hint?: string;
  placeholder?: string;
}

type FormSchema = Field[];

function Form(
  { schema, className = "" }: { schema: FormSchema; className: string },
) {
  return (
    <form className={className}>
      {schema.map((field, index) => {
        return (
          <div key={index} className="form-control">
            {field.type === "string" && (
              <>
                <label className="label">
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="input input-bordered input-lg"
                  placeholder={field.placeholder}
                />
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "text" && (
              <>
                <label className="label">
                  <span className="label-text text-lg">{field.label}</span>
                </label>
                <textarea
                  name={field.name}
                  className="textarea textarea-bordered textarea-lg"
                  placeholder={field.placeholder}
                >
                </textarea>
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
            {field.type === "checkbox" && (
              <>
                <label className="label cursor-pointer">
                  <span className="label-text text-lg">{field.label}</span>
                  <input
                    type="checkbox"
                    name={field.name}
                    className="checkbox checkbox-lg"
                  />
                </label>
                {field.hint && (
                  <span className="label-text-alt">{field.hint}</span>
                )}
              </>
            )}
          </div>
        );
      })}
    </form>
  );
}

export type { FormSchema };
export { Form };
