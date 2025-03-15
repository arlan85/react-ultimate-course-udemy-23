import PropTypes from 'prop-types';
import { useCities } from '../contexts';
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  
  const countries =  cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, {country: city.country, emoji:city.emoji}];
    } else {
      return arr;
    }
  }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default CountryList;
