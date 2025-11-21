import { notFound } from "next/navigation";
import { getDeliveriesMethods } from "./actions/getDeliveriesMethods";
import DeliveryViewClient from "./components/DeliveryViewClient";

const DeliveryView = async () => {
  const deliveriesMethods = await getDeliveriesMethods();

  if (!Array.isArray(deliveriesMethods) || deliveriesMethods.length === 0) {
    notFound();
  }

  return <DeliveryViewClient deliveriesMethods={deliveriesMethods} />;
};

export default DeliveryView;
