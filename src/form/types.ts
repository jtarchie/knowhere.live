type FieldType = "string" | "text" | "checkbox" | "prefix" | "address";

interface Field {
  defaultValue: string;
  hint?: string;
  label: string;
  name: string;
  placeholder?: string;
  type: FieldType;
}

type FormSchema = Field[];

interface FormValues {
  [key: string]: string;
}

interface InputProps {
  index: number;
  field: Field;
  value: string;
}

export type { Field, FormSchema, FormValues, InputProps };
