import { useCallback, useEffect, useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

function Address({ index, field }: InputProps) {
  if (field.type !== "address") return null;

  const { register, getValues, setValue } = useFormContext(); // Access the form methods

  const fullAddress = getValues(`${field.name}.full_address`);
  const [visibleAddress, setVisibleAddress] = useState<string>(fullAddress);

  useEffect(() => {
    console.log("fullAddress", fullAddress);
    setVisibleAddress(fullAddress);
  }, [fullAddress]);

  const onRetrieve = useCallback((response: GeoJSON.FeatureCollection) => {
    const feature = response.features[0];
    const properties = feature.properties || {};
    const geometry = feature.geometry as GeoJSON.Point;
    const [lon, lat] = geometry.coordinates;

    console.log(properties.full_address);

    setVisibleAddress(properties.full_address);

    setValue(`${field.name}.full_address`, properties.full_address);
    setValue(`${field.name}.latitude`, lat);
    setValue(`${field.name}.longitude`, lon);
    setValue(`${field.name}.accuracy`, properties.accuracy);
    setValue(`${field.name}.address_level1`, properties.address_level1);
    setValue(`${field.name}.address_level2`, properties.address_level2);
    setValue(`${field.name}.address_level3`, properties.address_level3);
    setValue(`${field.name}.address_line1`, properties.address_line1);
    setValue(`${field.name}.address_line2`, properties.address_line2);
    setValue(`${field.name}.address_line3`, properties.address_line3);
    setValue(`${field.name}.country`, properties.country);
    setValue(`${field.name}.country_code`, properties.country_code);
    setValue(`${field.name}.description`, properties.description);
    setValue(`${field.name}.feature_name`, properties.feature_name);
    setValue(`${field.name}.language`, properties.language);
    setValue(`${field.name}.maki`, properties.maki);
    setValue(`${field.name}.mapbox_id`, properties.mapbox_id);
    setValue(`${field.name}.matching_name`, properties.matching_name);
    setValue(`${field.name}.metadata`, properties.metadata);
    setValue(`${field.name}.place_name`, properties.place_name);
    setValue(`${field.name}.place_type`, properties.place_type);
    setValue(`${field.name}.postcode`, properties.postcode);
  }, [setValue, field.name]);

  return (
    <div key={index} className="form-control">
      <label className="fieldset-label" htmlFor={field.name}>
        {field.label}
      </label>
      <AddressAutofill
        accessToken={mapboxgl.accessToken as string}
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
          {...register(`${field.name}.full_address`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.latitude`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.longitude`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.accuracy`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_level1`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_level2`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_level3`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_line1`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_line2`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.address_line3`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.country`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.country_code`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.description`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.feature_name`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.language`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.maki`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.mapbox_id`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.matching_name`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.metadata`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.place_name`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.place_type`)}
        />
        <input
          type="hidden"
          {...register(`${field.name}.postcode`)}
        />
        {field.hint && <p className="label-text-alt">{field.hint}</p>}
      </AddressAutofill>
    </div>
  );
}

export { Address };
