import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts";
import { useGeolocation } from "../hooks";
import Button from "./Button";
import styles from "./Map.module.css";
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

function MapComponent() {
  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const [mapPosition, setMapPosition] = useState([40, 0]);
 const {
  position: geoPos,
   isloading: isGeoLoading,
    getGeoData 
  } = useGeolocation()


  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  //this is not required, you must use as least effect as you need, not too many effects to avoid re-denders
  useEffect(() => {
    if (geoPos) {
      setMapPosition([geoPos.lat, geoPos.lng]);
    }
  }, [geoPos])


  return (
    <div className={styles.mapContainer}>
    {!geoPos &&  <Button type="position" onClick={getGeoData}>
        {isGeoLoading ? "Loading..." : "Use my position"}
      </Button>}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
            // eventHandlers={{
            //   click: () => {
            //     navigate(`/app/cities/${city.id}`);
            //   },
            // }}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  //programatically navigate to the form page
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=&${lng}`);
    },
  });

  return null;
}

export default MapComponent;
