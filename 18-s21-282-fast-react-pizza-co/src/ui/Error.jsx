import { useRouteError } from 'react-router-dom';
import LinkButton from './form/LinkButton';

function NotFound() {
  const error = useRouteError()

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error?.data || error.message|| "Something went wrong, we sorry!"}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
