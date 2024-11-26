import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useState } from "preact/hooks";
import { InputProps } from "../types";
import { useFormContext } from "react-hook-form";

interface AddressValue {
  lat: number;
  lon: number;
  full_address: string;
}

function parseAddressValue(value: string | null): AddressValue {
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

function Address({ index, field }: InputProps) {
  if (field.type !== "address") return null;

  const { register, getValues, setValue } = useFormContext(); // Access the form methods

  const value = getValues(field.name);
  const parsedValue = parseAddressValue(value);
  const [visibleAddress, setVisibleAddress] = useState<string>(
    parsedValue.full_address,
  );

  useEffect(() => {
    setVisibleAddress(parsedValue.full_address);
  }, [parsedValue.full_address]);

  const onRetrieve = useCallback((response: GeoJSON.FeatureCollection) => {
    const feature = response.features[0];
    setVisibleAddress(feature.properties?.full_address);

    const [lon, lat] = (feature.geometry as GeoJSON.Point).coordinates;
    setValue(
      field.name,
      [feature.properties?.full_address, lat, lon].join("|"),
    );
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
          {...(register(field.name) as React.InputHTMLAttributes<
            HTMLInputElement
          >)}
        />
        {field.hint && <span className="label-text-alt">{field.hint}</span>}
      </AddressAutofill>
    </div>
  );
}

export type { AddressValue };
export { Address };
