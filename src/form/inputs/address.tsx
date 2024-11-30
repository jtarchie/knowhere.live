import React, { useCallback, useEffect, useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

function Address({ index, field }: InputProps) {
  if (field.type !== "address") return null;

  const { register, getValues, setValue } = useFormContext(); // Access the form methods

  const fullAddress = getValues(`${field.name}.full_address`);
  const [visibleAddress, setVisibleAddress] = useState<string>(
    fullAddress,
  );

  useEffect(() => {
    setVisibleAddress(fullAddress);
  }, []);

  const onRetrieve = useCallback((response: GeoJSON.FeatureCollection) => {
    const feature = response.features[0];
    const properties = feature.properties || {};
    const geometry = feature.geometry as GeoJSON.Point;
    const [lon, lat] = geometry.coordinates;

    setVisibleAddress(properties.full_address);
    console.log("here");

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
  }, []);

  return (
    <div key={index} className="form-control">
      <label className="label" htmlFor={field.name}>
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
          {...register(
            `${field.name}.full_address`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.latitude`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.longitude`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.accuracy`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_level1`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_level2`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_level3`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_line1`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_line2`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.address_line3`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.country`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.country_code`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.description`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.feature_name`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.language`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.maki`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.mapbox_id`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(
            `${field.name}.matching_name`,
          ) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.metadata`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.place_name`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.place_type`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        <input
          type="hidden"
          {...register(`${field.name}.postcode`) as React.InputHTMLAttributes<
            HTMLInputElement
          >}
        />
        {field.hint && <span className="label-text-alt">{field.hint}</span>}
      </AddressAutofill>
    </div>
  );
}

export { Address };
