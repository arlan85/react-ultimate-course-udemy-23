import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData(); // step 3 use the loader data in the component.
  console.log(menu);
  return (
    <ul>
      {menu?.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

//step 1 create the loader
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
