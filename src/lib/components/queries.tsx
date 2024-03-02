import { SearchManager } from "../managers/search_manager";

function Queries({ manager }: { manager: SearchManager }) {
  if (manager.queries.values().length === 0) {
    return <></>;
  }

  return (
    <div class="dropdown dropdown-open flex">
      <ul tabindex={0} class="menu bg-base-200 grow rounded-box" role="list">
        {manager.queries.values().map((sq) => {
          const style = {
            backgroundColor: sq.color,
          };

          return (
            <li role="listitem">
              <div class="flex flex-row justify-between items-center">
                <div class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 rounded-full border-2 border-white"
                    style={style}
                  >
                  </div>
                  {sq.query}
                </div>
                <button
                  onClick={() => manager.remove(sq.query)}
                  class="btn btn-xs btn-error btn-circle"
                  title={`Remove ${sq.query} from the map`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { Queries };
