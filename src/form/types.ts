type FieldType = "string" | "text" | "checkbox" | "prefix";

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

export type { FormSchema, FormValues };
