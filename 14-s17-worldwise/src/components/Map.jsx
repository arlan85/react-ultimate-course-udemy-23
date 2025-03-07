import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function MapComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate()
  return (
    <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
      <h1>Map</h1>
      <p>
        lat: {lat} lng: {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 10, lng: 20 })}>
        Click
      </button>

     
    </div>
  );
}

export default MapComponent;
