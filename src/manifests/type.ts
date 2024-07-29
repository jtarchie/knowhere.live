import { FormSchema, FormValues } from "../form/types";

interface Manifest {
  source: string;
  filter: FormSchema;
  filterValues: FormValues;
  about: string;
}

export type { Manifest };
