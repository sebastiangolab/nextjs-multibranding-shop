"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckoutStep,
  DeliveryMethodData,
  CheckoutSummary,
  useCheckoutStore,
} from "@/features/checkout";
import { useRouter } from "next/navigation";
import BasicContainer from "@/shared/components/BasicContainer";
import { DeliveryMethodSelector } from "../DeliveryMethodSelector";
import { DeliveryForm } from "../DeliveryForm";
import { DeliveryFormRef } from "../../types";

interface DeliveryViewClientProps {
  deliveriesMethods: DeliveryMethodData[];
}

const DeliveryViewClient = ({ deliveriesMethods }: DeliveryViewClientProps) => {
  const formRef = useRef<DeliveryFormRef>(null);
  const router = useRouter();

  const { updateDeliveryMethodData, updateDeliveryFormData } =
    useCheckoutStore();

  const [buttonError, setButtonError] = useState<string>("");

  // Validate form on any change when there is an existing error
  const handleFormChange = async () => {
    if (buttonError && formRef.current) {
      const isValid = await formRef.current.validateForm();
      if (isValid) {
        setButtonError("");
      }
    }
  };

  const handleProceedToPayment = async () => {
    if (!formRef.current) return;

    const isValid = await formRef.current.validateForm();

    if (isValid) {
      const formData = formRef.current.getFormData();

      updateDeliveryFormData(formData);

      router.push("/platnosc");
    } else {
      setButtonError("Uzupełnij wymagane pola");

      // scroll to top of the page to show the errors
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!Array.isArray(deliveriesMethods) || deliveriesMethods.length === 0) {
    return null;
  }

  useEffect(() => {
    updateDeliveryMethodData(deliveriesMethods[0]);
  }, []);

  return (
    <BasicContainer className="py-8">
      <h1 className="text-3xl font-bold mb-8">Dostawa</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <DeliveryForm ref={formRef} onFormChange={handleFormChange} />

          <DeliveryMethodSelector deliveriesMethods={deliveriesMethods} />
        </div>

        <div>
          <CheckoutSummary
            step={CheckoutStep.DELIVERY}
            buttonOnClick={handleProceedToPayment}
            errorMessage={buttonError}
          />
        </div>
      </div>
    </BasicContainer>
  );
};

export default DeliveryViewClient;
