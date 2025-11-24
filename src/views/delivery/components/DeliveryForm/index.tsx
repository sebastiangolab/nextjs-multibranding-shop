"use client";

import { Input } from "@/shared/shadcn/ui/input";
import { Checkbox } from "@/shared/shadcn/ui/checkbox";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeliveryFormData,
  deliveryFormSchema,
  useCheckoutStore,
} from "@/features/checkout";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { DeliveryFormRef } from "../../types";

const VOIVODESHIPS = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

interface DeliveryFormProps {
  onFormChange?: () => void;
}

export const DeliveryForm = forwardRef<DeliveryFormRef, DeliveryFormProps>(
  ({ onFormChange }, ref) => {
    const { deliveryFormData } = useCheckoutStore();

    // Destructure existing form data if available
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      houseNumber,
      apartmentNumber,
      postalCode,
      city,
      voivodeship,
      isDifferentBillingAddress,
      billingStreet,
      billingHouseNumber,
      billingApartmentNumber,
      billingPostalCode,
      billingCity,
      billingVoivodeship,
      notes,
    } = deliveryFormData || {};

    const form = useForm<DeliveryFormData>({
      resolver: zodResolver(deliveryFormSchema),
      mode: "onChange", // Validate on change
      defaultValues: {
        // Personal data
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",

        // Delivery address
        street: street || "",
        houseNumber: houseNumber || "",
        apartmentNumber: apartmentNumber || "",
        postalCode: postalCode || "",
        city: city || "",
        voivodeship: voivodeship || "",

        // Billing address
        isDifferentBillingAddress: isDifferentBillingAddress || false,
        billingStreet: billingStreet || "",
        billingHouseNumber: billingHouseNumber || "",
        billingApartmentNumber: billingApartmentNumber || "",
        billingPostalCode: billingPostalCode || "",
        billingCity: billingCity || "",
        billingVoivodeship: billingVoivodeship || "",

        // Additional notes
        notes: notes || "",
      },
    });

    // Expose validation and getFormData methods to parent
    useImperativeHandle(ref, () => ({
      validateForm: async () => {
        const isValid = await form.trigger();
        return isValid;
      },
      getFormData: () => form.getValues(),
    }));

    // Notify parent when form changes
    useEffect(() => {
      if (onFormChange) {
        const subscription = form.watch(() => {
          onFormChange();
        });

        return () => subscription.unsubscribe();
      }
    }, [form, onFormChange]);

    const isDifferentBillingAddressField = form.watch(
      "isDifferentBillingAddress"
    );

    const personalDataFormElement = (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-5">Dane osobowe</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię *</FormLabel>
                <FormControl>
                  <Input placeholder="Jan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko *</FormLabel>
                <FormControl>
                  <Input placeholder="Kowalski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jan.kowalski@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer telefonu *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+48 123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );

    const deliveryAdressFormElement = (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-5">Adres dostawy</h3>

        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ulica *</FormLabel>
                    <FormControl>
                      <Input placeholder="Marszałkowska" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nr domu *</FormLabel>
                  <FormControl>
                    <Input placeholder="142" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="apartmentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nr mieszkania</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod pocztowy *</FormLabel>
                  <FormControl>
                    <Input placeholder="00-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miasto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Warszawa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="voivodeship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Województwo *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz województwo" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {VOIVODESHIPS.map((voivodeship) => (
                      <SelectItem key={voivodeship} value={voivodeship}>
                        {voivodeship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );

    const billingAddressFormElement = (
      <div className="bg-card rounded-lg border p-6">
        <FormField
          control={form.control}
          name="isDifferentBillingAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Adres rozliczeniowy jest inny niż adres dostawy
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {isDifferentBillingAddressField && (
          <div className="grid grid-cols-1 gap-5 pt-4 border-t mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="billingStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ulica *</FormLabel>
                      <FormControl>
                        <Input placeholder="Marszałkowska" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="billingHouseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nr domu *</FormLabel>
                    <FormControl>
                      <Input placeholder="142" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="billingApartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nr mieszkania</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod pocztowy *</FormLabel>
                    <FormControl>
                      <Input placeholder="00-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miasto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Warszawa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="billingVoivodeship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Województwo *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz województwo" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {VOIVODESHIPS.map((voivodeship) => (
                        <SelectItem key={voivodeship} value={voivodeship}>
                          {voivodeship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    );

    const additionalNotesFormElement = (
      <div className="bg-card rounded-lg border p-6">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uwagi do zamówienia (opcjonalnie)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Np. proszę dzwonić przed dostawą..."
                  className="mt-2"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );

    return (
      <Form {...form}>
        <div className="space-y-6">
          {/* Personal data */}
          {personalDataFormElement}

          {/* Delivery address */}
          {deliveryAdressFormElement}

          {/* Billing address */}
          {billingAddressFormElement}

          {/* Additional notes */}
          {additionalNotesFormElement}
        </div>
      </Form>
    );
  }
);

DeliveryForm.displayName = "DeliveryForm";
