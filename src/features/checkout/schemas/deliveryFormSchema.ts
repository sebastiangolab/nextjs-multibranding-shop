import { z } from "zod";

// Postal code validation
const postalCodeRegex = /^\d{2}-\d{3}$/;

// Phone number validation (Polish format)
const phoneRegex = /^(\+48\s?)?\d{9}$/;

export const deliveryFormSchema = z
  .object({
    // Personal data
    firstName: z
      .string()
      .min(2, "Imię musi mieć minimum 2 znaki")
      .max(50, "Imię może mieć maksymalnie 50 znaków")
      .regex(
        /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
        "Imię zawiera niedozwolone znaki"
      ),

    lastName: z
      .string()
      .min(2, "Nazwisko musi mieć minimum 2 znaki")
      .max(50, "Nazwisko może mieć maksymalnie 50 znaków")
      .regex(
        /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
        "Nazwisko zawiera niedozwolone znaki"
      ),

    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Nieprawidłowy format adresu email"),

    phone: z
      .string()
      .min(1, "Numer telefonu jest wymagany")
      .regex(
        phoneRegex,
        "Nieprawidłowy format numeru telefonu (np. +48 123456789 lub 123456789)"
      ),

    // Delivery address
    street: z
      .string()
      .min(3, "Nazwa ulicy musi mieć minimum 3 znaki")
      .max(100, "Nazwa ulicy może mieć maksymalnie 100 znaków"),

    houseNumber: z
      .string()
      .min(1, "Numer domu jest wymagany")
      .max(10, "Numer domu może mieć maksymalnie 10 znaków"),

    apartmentNumber: z
      .string()
      .max(10, "Numer mieszkania może mieć maksymalnie 10 znaków"),

    postalCode: z
      .string()
      .regex(
        postalCodeRegex,
        "Nieprawidłowy format kodu pocztowego (np. 00-000)"
      ),
    city: z
      .string()
      .min(2, "Nazwa miasta musi mieć minimum 2 znaki")
      .max(50, "Nazwa miasta może mieć maksymalnie 50 znaków"),

    voivodeship: z.string().min(1, "Wybierz województwo"),

    // Billing address
    isDifferentBillingAddress: z.boolean(),

    billingStreet: z.string(),
    billingHouseNumber: z.string(),
    billingApartmentNumber: z.string(),
    billingPostalCode: z.string(),
    billingCity: z.string(),
    billingVoivodeship: z.string(),

    // Notes
    notes: z.string().max(500, "Uwagi mogą mieć maksymalnie 500 znaków"),
  })
  .superRefine((data, ctx) => {
    // Billing address validation when different from delivery
    if (data.isDifferentBillingAddress) {
      if (!data.billingStreet || data.billingStreet.length < 3) {
        ctx.addIssue({
          code: "custom",
          message: "Nazwa ulicy musi mieć minimum 3 znaki",
          path: ["billingStreet"],
        });
      }

      if (!data.billingHouseNumber) {
        ctx.addIssue({
          code: "custom",
          message: "Numer domu jest wymagany",
          path: ["billingHouseNumber"],
        });
      }

      if (
        !data.billingPostalCode ||
        !postalCodeRegex.test(data.billingPostalCode)
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Nieprawidłowy format kodu pocztowego (np. 00-000)",
          path: ["billingPostalCode"],
        });
      }

      if (!data.billingCity || data.billingCity.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Nazwa miasta musi mieć minimum 2 znaki",
          path: ["billingCity"],
        });
      }

      if (!data.billingVoivodeship) {
        ctx.addIssue({
          code: "custom",
          message: "Wybierz województwo",
          path: ["billingVoivodeship"],
        });
      }
    }
  });

export type DeliveryFormData = z.infer<typeof deliveryFormSchema>;
