interface BaseField {
  label: string;
  name: string;
  hint?: string;
  placeholder?: string;
}

interface StringField extends BaseField {
  type: "string";
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface TextField extends BaseField {
  type: "text";
  defaultValue: string;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue: "0" | "1";
}

interface PrefixField extends BaseField {
  type: "prefix";
  defaultValue: string;
}

interface AddressField extends BaseField {
  type: "address";
  defaultValue: string;
}

type Field =
  | StringField
  | TextField
  | CheckboxField
  | PrefixField
  | AddressField;

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
