// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts";
import { useUrlPosition } from "../hooks";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_GEO_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [newLat, newLng] = useUrlPosition();
  const [isLoadingGeocod, setIsLoadingGeocod] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodeError, setGeocodeError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!newLat && !newLng) return;

    async function fetchGeoData() {
      try {
        setIsLoadingGeocod(true);
        setGeocodeError("");
        const response = await fetch(
          `${BASE_GEO_URL}?latitude=${newLat}&longitude=${newLng}`
        );
        const data = await response.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
        setGeocodeError(error.message);
      } finally {
        setIsLoadingGeocod(false);
      }
    }
    fetchGeoData();
  }, [newLat, newLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date ) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      latitude: newLat,
      longitude: newLng,
      position: { lat: newLat, lng: newLng },
    };
    await createCity(newCity)
    navigate("/app/cities");
  }

  if(!newLat && !newLng) return <Message message="Start by clicking somewhere on the map" />
  if (isLoadingGeocod) return <Spinner />;
  if (geocodeError) return <Message message={geocodeError} />;

  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} dateFormat="dd/MM/yyy" onChange={(date) => setDate(date)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
