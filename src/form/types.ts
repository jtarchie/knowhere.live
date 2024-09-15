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
  minLength?: number;
  maxLength?: number;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue: "0" | "1";
}

interface PrefixField extends BaseField {
  type: "area";
  defaultValue: string;
}

interface AddressField extends BaseField {
  type: "address";
  defaultValue: string;
}

interface RangeField extends BaseField {
  type: "range";
  defaultValue: string;
  min: number;
  max: number;
  step?: number;
}

interface PromptField extends BaseField {
  type: "prompt";
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
}

type Field =
  | StringField
  | TextField
  | PromptField
  | CheckboxField
  | PrefixField
  | AddressField
  | RangeField;

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
