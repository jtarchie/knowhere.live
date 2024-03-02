import { SearchInput } from "./components/search_input";
import { Queries } from "./components/queries";
import { SearchManager } from "./managers/search_manager";

function Content({ manager }: { manager: SearchManager }) {
  return (
    <>
      <SearchInput manager={manager} />
      <Queries manager={manager} />
    </>
  );
}

export { Content };
