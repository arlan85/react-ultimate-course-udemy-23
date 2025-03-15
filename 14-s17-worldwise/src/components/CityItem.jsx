import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts';
import styles from './CityItem.module.css';
const formatDate  = (date) => new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position} = city
  const {currentCity} =useCities();
  const {lat, lng} = position
  return (
    <li>
      <Link className={`${styles.cityItem} ${id===currentCity.id? styles['cityItem--active']:''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
}
CityItem.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CityItem;
