import {
  useState, ReactChild,
} from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

interface AddressAutocompleteProps {
  handleSelectAutocomplete: (place: google.maps.places.PlaceResult) => void;
  children: ReactChild;
}

function AddressAutocomplete({
  handleSelectAutocomplete,
  children,
}: AddressAutocompleteProps) {
  const libraries: ("places")[] = ["places"];
  const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      handleSelectAutocomplete(place);
    }
  };
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        {children}
      </Autocomplete>
    </LoadScript>
  );
}

export default AddressAutocomplete;
