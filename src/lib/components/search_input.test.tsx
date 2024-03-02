import { SearchManager } from "../managers/search_manager";
import { SearchInput } from "./search_input";
import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { Map as MockMap } from "../mocks/map";

/**
 * @vitest-environment jsdom
 */

describe("SearchInput", () => {
  it("clears the search on submission", async ({ expect }) => {
    const map = MockMap();
    vi.spyOn(map, "removeLayer");
    vi.spyOn(map, "addLayer");

    const manager = new SearchManager(map);

    const { container } = render(<SearchInput manager={manager} />);
    const field: HTMLInputElement = await screen.findByPlaceholderText(
      "Search",
    );

    fireEvent.input(field, { target: { value: "hello" } });
    fireEvent.submit(container.querySelector("form")!);

    expect(field.value).toEqual("");
  });
});
