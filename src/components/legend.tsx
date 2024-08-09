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

  if (legendItems.length == 0) {
    return <></>;
  }

  return (
    <div className="p-4 bg-base-100 shadow-lg rounded-lg">
      <h3 className="text-lg font-bold mb-2 text-primary">
        Legend
      </h3>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index} className="flex items-center mb-1">
            <span
              className="w-4 h-4 mr-2 rounded-full border-2 border-white"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-primary">
              {item.legend}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Legend };
