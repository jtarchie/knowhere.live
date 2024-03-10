import { describe, it } from "vitest";
import { Queries } from "./queries";
import { SearchManager } from "../managers/search_manager";
import { render } from "@testing-library/preact";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-preact-pure";
import { Map as MockMap } from "../mocks/map";

configure({ adapter: new Adapter() });

/**
 * @vitest-environment jsdom
 */

describe("Queries", () => {
  it("renders nothing if there are no queries", ({ expect }) => {
    const map = MockMap();
    const manager = new SearchManager(map);

    const { container } = render(<Queries manager={manager} />);
    expect(container.textContent).toEqual("");
  });

  it("renders a query when adding and removing", ({ expect }) => {
    const map = MockMap();

    const manager = new SearchManager(map);
    const wrapper = mount(<Queries manager={manager} />);

    manager.add("test");
    wrapper.setProps({ manager }); // force a re-render
    expect(wrapper.text()).toContain("test");

    manager.remove("test");
    wrapper.setProps({}); // force a re-render
    expect(wrapper.text()).not.toContain("test");
  });
});
