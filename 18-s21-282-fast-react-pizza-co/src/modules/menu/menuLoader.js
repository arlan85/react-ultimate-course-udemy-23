import { getMenu } from "../../services/apiRestaurant";

//step 1 create the loader
export async function loader() {
  const menu = await getMenu();
  return menu;
}