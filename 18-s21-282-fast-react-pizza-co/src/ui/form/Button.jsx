import { Link } from 'react-router-dom';

function Button({ children, disabled, to }) {
  const classNames =
    'mt-4 inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 sm:px-6 sm:py-4';
  if (to) {
    return <Link to={to} className={classNames}>{children}</Link>;
  }
  return (
    <button disabled={disabled} className={classNames}>
      {children}
    </button>
  );
}

export default Button;
