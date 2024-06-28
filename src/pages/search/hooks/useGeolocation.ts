import { getCoords } from "@/lib/api/MyUserApi";
import { useState, useEffect } from "react";
import { create } from "zustand";

interface GeolocationToggleStore {
  handleActivateGeolocation: () => void;
  active: boolean;
}

const useGeolocationToggle = create<GeolocationToggleStore>((set, get) => ({
  handleActivateGeolocation: () => {
    if (get().active) {
      set({ active: false });
      localStorage.removeItem("getCoords");
    } else {
      set({ active: !get().active });
      localStorage.setItem("getCoords", "true");
    }
  },
  active: JSON.parse(localStorage.getItem("getCoords")!),
}));

function useGeolocation() {
  const {
    active,
  } = useGeolocationToggle();
  const [userLocation, setUserLocation] = useState<[number, number] | null>([0, 0]);
  useEffect(() => {
    (async () => {
      if (active) {
        const coords = await getCoords();
        setUserLocation([coords.location.latitude, coords.location.longitude]);
      } else {
        setUserLocation(null);
      }
    })();
  }, [active]);
  return {
    userLocation,
  };
}

export {
  useGeolocationToggle,
  useGeolocation,
};
