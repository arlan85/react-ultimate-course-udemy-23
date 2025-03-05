import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
const formatDate  = (date) => new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date} = city
  return (
    <li>
      <Link className={styles.cityItem} to={`${city.id}`}>
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
  }).isRequired,
};

export default CityItem;
