import { useSelector } from 'react-redux';
import CreateUser from '../modules/user/CreateUser';
import Button from './form/Button';

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16 md:px-6">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu">Continue ordering <i>{username}</i></Button>
      )}
    </div>
  );
}

export default Home;
