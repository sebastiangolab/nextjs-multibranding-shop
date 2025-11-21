import { DeliveryFormData } from "@/features/checkout";

export interface DeliveryFormRef {
  validateForm: () => Promise<boolean>;
  getFormData: () => DeliveryFormData;
}
