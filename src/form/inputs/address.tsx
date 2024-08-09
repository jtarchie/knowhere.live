import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useState } from "preact/hooks";
import { InputProps } from "../types";

interface AddressValue {
  lat: number;
  lon: number;
  full_address: string;
}

function parseAddressValue(value: string): AddressValue {
  if (!value) {
    return {
      lat: 0,
      lon: 0,
      full_address: "",
    };
  }

  const [fullAddress, latitude, longitude] = value.split("|");
  return {
    lat: parseFloat(latitude),
    lon: parseFloat(longitude),
    full_address: fullAddress,
  };
}

function Address({ index, field, value }: InputProps) {
  const defaultValue = parseAddressValue(field.defaultValue);
  const parsedValue = parseAddressValue(value);

  const [visibleAddress, setVisibleAddress] = useState<string>(
    parsedValue.full_address || defaultValue.full_address,
  );

  const [encodedAddress, setEncodedAddress] = useState<string>(
    value || field.defaultValue,
  );

  useEffect(() => {
    setVisibleAddress(parsedValue.full_address || defaultValue.full_address);
  }, [value, defaultValue]);

  const onRetrieve = useCallback((response: GeoJSON.FeatureCollection) => {
    const feature = response.features[0];
    setVisibleAddress(feature.properties?.full_address);

    const [lon, lat] = (feature.geometry as GeoJSON.Point).coordinates;
    setEncodedAddress([feature.properties?.full_address, lat, lon].join("|"));
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
          className="input input-bordered input-lg input-primary w-full"
          id={field.name}
          value={visibleAddress}
        />
        <input
          type="hidden"
          name={field.name}
          value={encodedAddress}
        />
        {field.hint && <span className="label-text-alt">{field.hint}</span>}
      </AddressAutofill>
    </div>
  );
}

export type { AddressValue };
export { Address };