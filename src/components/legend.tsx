import { useEffect, useState } from "preact/hooks";

interface LegendProps {
  geoJSON: GeoJSON.FeatureCollection;
}

interface LegendItem {
  color: string;
  legend: string;
}

function Legend({ geoJSON }: LegendProps) {
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const items: LegendItem[] = [];
    const seen = new Set<string>();

    geoJSON.features.forEach((feature) => {
      const legend = feature.properties?.legend;
      const color = feature.properties?.["marker-color"] || "#555";

      if (legend && !seen.has(legend)) {
        items.push({ color, legend });
        seen.add(legend);
      }
    });

    setLegendItems(items);
  }, [geoJSON]);

  if (legendItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`${isVisible ? "w-64" : "w-12"}`}
    >
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="btn btn-circle btn-primary"
          aria-label="Show legend"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </svg>
        </button>
      )}
      {isVisible && (
        <div className="p-4 bg-base-100 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-primary">Legend</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Close legend"
            >
              ✕
            </button>
          </div>
          <ul>
            {legendItems.map((item, index) => (
              <li key={index} className="flex items-center mb-1">
                <span
                  className="w-4 h-4 mr-2 rounded-full border border-[#333]"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-secondary">{item.legend}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export { Legend };
