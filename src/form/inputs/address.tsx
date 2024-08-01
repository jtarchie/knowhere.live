import { AddressAutofill } from "@mapbox/search-js-react";
import { Input } from "../types";
import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useState } from "preact/hooks";

function Address(
  { index, field, onChange, address: value }: Input & {
    address: {
      full_address: string;
      lat: number;
      lon: number;
    };
  },
) {
  const [lat, setLat] = useState<number>(value.lat);
  const [lon, setLon] = useState<number>(value.lon);
  const [address, setAddress] = useState<string>(value.full_address);

  useEffect(() => {
    setLat(value.lat);
    setLon(value.lon);
    setAddress(value.full_address);
  }, [value]);

  const onRetrieve = useCallback((response: GeoJSON.FeatureCollection) => {
    const feature = response.features[0];
    const [lon, lat] = (feature.geometry as GeoJSON.Point).coordinates;
    setLon(lon);
    setLat(lat);
    setAddress(feature.properties?.full_address);

    onChange();
  }, []);

  return (
    <div key={index} className="form-control">
      <label className="label" for={field.name}>
        <span className="label-text text-lg">{field.label}</span>
      </label>
      <AddressAutofill
        accessToken={mapboxgl.accessToken}
        onRetrieve={onRetrieve}
      >
        <input
          name="address-1"
          className="input input-bordered input-lg w-full"
          id={field.name}
          value={address}
        />
        <input
          type="hidden"
          name={`${field.name}_full_address`}
          value={address}
        />
        <input type="hidden" name={`${field.name}_lat`} value={lat} />
        <input type="hidden" name={`${field.name}_lon`} value={lon} />
        {field.hint && <span className="label-text-alt">{field.hint}</span>}
      </AddressAutofill>
    </div>
  );
}

export { Address };
