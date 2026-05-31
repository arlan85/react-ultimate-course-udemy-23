import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/form/Button';
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  console.log(order); //needed to avoid eslint breaks 
  return (
    <fetcher.Form method="PATCH" className="text-right">
      {/** we can add inputs here to update other content needed */}
      <Button type="primary">Change to priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  console.log('update');
  const data = { priority: true };
  const response = await updateOrder(params.orderId, data);
  return null;
}
