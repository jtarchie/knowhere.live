import mapboxgl from "mapbox-gl";
import { vi } from "vitest";

function Map(): mapboxgl.Map {
  return {
    addSource: vi.fn(),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    removeSource: vi.fn(),
    fitBounds: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    getSource: vi.fn(),
    getLayer: vi.fn(),
    getContainer: vi.fn(),
    getBounds: vi.fn(),
    getCenter: vi.fn(),
    getZoom: vi.fn(),
    setZoom: vi.fn(),
    setCenter: vi.fn(),
    setMaxBounds: vi.fn(),
    setMinZoom: vi.fn(),
    setMaxZoom: vi.fn(),
    setStyle: vi.fn(),
    setFeatureState: vi.fn(),
    getFeatureState: vi.fn(),
    getCanvas: vi.fn(),
    getCanvasContainer: vi.fn(),
    getLayers: vi.fn(),
    getRenderWorldCopies: vi.fn(),
    getStyle: vi.fn(),
  } as unknown as mapboxgl.Map;
}

export { Map };
