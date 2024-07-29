import { afterEach, describe, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/preact";
import { Form } from "./component";
import { FormSchema, FormValues } from "./types";

/**
 * @vitest-environment jsdom
 */

describe("Form component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("renders correctly with given schema and values", ({ expect }) => {
    const schema: FormSchema = [
      {
        type: "string",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
      },
      {
        type: "text",
        name: "description",
        label: "Description",
        placeholder: "Enter description",
      },
      {
        type: "checkbox",
        name: "subscribe",
        label: "Subscribe",
        defaultValue: "true",
      },
    ];
    const values: FormValues = {
      firstName: "John",
      description: "A short description",
      subscribe: "true",
    };

    render(
      <Form schema={schema} values={values} onChange={() => {}} className="" />,
    );

    expect((screen.getByLabelText(/First Name/i) as HTMLInputElement).value)
      .toEqual("John");
    expect((screen.getByLabelText(/Description/i) as HTMLInputElement).value)
      .toEqual(
        "A short description",
      );
  });

  test("calls onChange with updated values when input changes", ({ expect }) => {
    const schema: FormSchema = [
      {
        type: "string",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
      },
    ];
    const values: FormValues = {
      firstName: "John",
    };
    const onChangeMock = vi.fn();

    render(
      <Form
        schema={schema}
        values={values}
        onChange={onChangeMock}
        className=""
      />,
    );

    const input = screen.getByLabelText(/First Name/i);
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(onChangeMock).toHaveBeenCalledWith({ firstName: "Jane" });
  });

  test("renders hint text if provided in schema", ({ expect }) => {
    const schema: FormSchema = [
      {
        type: "string",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
        hint: "This is a hint",
      },
    ];
    const values: FormValues = {
      firstName: "John",
    };

    render(
      <Form schema={schema} values={values} onChange={() => {}} className="" />,
    );

    expect(screen.getByText(/This is a hint/i)).toBeTruthy();
  });
});
