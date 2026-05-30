import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData(); // step 3 use the loader data in the component.
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu?.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;
