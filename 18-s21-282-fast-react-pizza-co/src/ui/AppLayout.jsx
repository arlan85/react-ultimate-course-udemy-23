import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../modules/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout({ children }) {
  /* is is a global state for whole app 
  So, that's the whole reason why we placed this
loading indicator in the app layout in the first place,
because this will then render our loader
each time that somewhere in the app something is loading.*/
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-xl">
          <Outlet />
          {children}
        </main>
      </div>
      <div>
        <CartOverview />
        <footer className="bg-gray-800 p-4 text-center text-stone-100">
          &copy; {new Date().getFullYear()} Fast React Pizza Co. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

export default AppLayout;
