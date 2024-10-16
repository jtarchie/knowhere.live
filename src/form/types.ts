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
  defaultValue: boolean;
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

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

interface JsonObject {
  [key: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

type FormValues = JsonObject;

interface InputProps {
  index: number;
  field: Field;
}

export type { Field, FormSchema, FormValues, InputProps };
