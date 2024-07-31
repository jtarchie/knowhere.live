interface Input {
  index: number;
  field: Field;
  onChange: () => void;
  value: string;
}

type FieldType = "string" | "text" | "checkbox" | "prefix" | "address";

interface Field {
  defaultValue?: string;
  hint?: string;
  label: string;
  name: string;
  placeholder?: string;
  type: FieldType;
}

type FormSchema = Field[];

interface FormValues {
  [key: string]: FormDataEntryValue;
}

export type { Field, FormSchema, FormValues, Input };
