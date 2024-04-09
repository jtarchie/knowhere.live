import mapboxgl from "mapbox-gl";
import { vi } from "vitest";

function MockMap(): mapboxgl.Map {
  const events = new Map();
  const fireEvents = ["idle"];
  const getSource = { setData: vi.fn() };

  return {
    addLayer: vi.fn(() => {
      fireEvents.forEach((name) => {
        const event = events.get(name);
        if (event) {
          event();
        }
      });
    }),
    addSource: vi.fn(() => {
      fireEvents.forEach((name) => {
        const event = events.get(name);
        if (event) {
          event();
        }
      });
    }),
    fitBounds: vi.fn(),
    getBounds: vi.fn(),
    getCanvas: vi.fn(),
    getCanvasContainer: vi.fn(),
    getCenter: vi.fn(),
    getContainer: vi.fn(),
    getFeatureState: vi.fn(),
    getLayer: vi.fn(),
    getLayers: vi.fn(),
    getRenderWorldCopies: vi.fn(),
    getSource: vi.fn(() => getSource),
    getStyle: vi.fn(),
    getZoom: vi.fn(),
    off: vi.fn((name) => {
      events.delete(name);
    }),
    on: vi.fn((name, fn) => {
      events.set(name, fn);
    }),
    once: vi.fn(),
    querySourceFeatures: () => [],
    removeLayer: vi.fn(),
    removeSource: vi.fn(),
    setCenter: vi.fn(),
    setFeatureState: vi.fn(),
    setMaxBounds: vi.fn(),
    setMaxZoom: vi.fn(),
    setMinZoom: vi.fn(),
    setStyle: vi.fn(),
    setZoom: vi.fn(),
  } as unknown as mapboxgl.Map;
}

export { MockMap as Map };
