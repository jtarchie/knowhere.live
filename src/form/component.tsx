import { FormSchema, FormValues } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import { Address } from "./inputs/address";
import { Area } from "./inputs/area";
import { Checkbox } from "./inputs/checkbox";
import { Prompt } from "./inputs/prompt";
import { Range } from "./inputs/range";
import { String } from "./inputs/string";
import { Text } from "./inputs/text";

interface FormProps {
  className: string;
  onReset?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => void;
  schema: FormSchema;
  values: FormValues;
}

const componentMap = {
  address: Address,
  area: Area,
  checkbox: Checkbox,
  prompt: Prompt,
  range: Range,
  string: String,
  text: Text,
};

function Form({
  className = "",
  onReset = () => {},
  onSubmit = () => {},
  schema = [],
  values = {},
}: FormProps) {
  // Initialize react-hook-form with default values
  const defaultValues = schema.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }

    return acc;
  }, {} as FormValues);
  const methods = useForm({ defaultValues: defaultValues, values: values });
  const { handleSubmit, reset } = methods;

  const onSubmitCallback = (data: FormValues) => {
    onSubmit(data);
  };

  const onResetCallback = () => {
    reset();
    onReset({});
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onSubmitCallback)}
        onReset={onResetCallback}
      >
        {schema.map((field, index) => {
          const Component = componentMap[field.type];
          return <Component key={index} index={index} field={field} />;
        })}

        <div className="flex justify-center mt-4 space-x-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Apply
          </button>
          <button type="reset" className="btn btn-secondary btn-lg">
            Reset
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export { Form };
