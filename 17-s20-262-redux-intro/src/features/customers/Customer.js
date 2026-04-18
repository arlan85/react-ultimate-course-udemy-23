import { useSelector } from "react-redux";
function Customer() {
  // this is the way to get the state from the store, we can use useSelector hook to get the state from the store, and we can use it in any component that is wrapped by the Provider component
  const customer = useSelector((store) => store.customer.name);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
