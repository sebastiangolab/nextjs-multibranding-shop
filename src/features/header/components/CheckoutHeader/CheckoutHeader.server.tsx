import { CheckoutStep } from "@/features/checkout";
import { getHeaderData } from "../../actions/getHeaderData";
import CheckoutHeaderClient from "./CheckoutHeader.client";

interface CheckoutHeaderProps {
  currentStep: CheckoutStep;
}

const CheckoutHeader = async ({ currentStep }: CheckoutHeaderProps) => {
  const data = await getHeaderData();

  if (!data) {
    return null;
  }

  return (
    <CheckoutHeaderClient logoData={data.logoData} currentStep={currentStep} />
  );
};

export default CheckoutHeader;
