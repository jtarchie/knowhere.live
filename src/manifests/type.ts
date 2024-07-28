import { FormSchema, FormValues } from "../component/form";

interface Manifest {
  source: string;
  filter: FormSchema;
  filterValues: FormValues;
  about: string;
}

export type { Manifest };
