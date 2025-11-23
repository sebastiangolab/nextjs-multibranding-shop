"use client";

import { Price } from "@/features/prices";
import { LinkButton } from "@/shared/components/LinkButton";
import { CheckCircle, Mail } from "lucide-react";

interface PaymentSuccessProps {
  orderId: string;
  email: string;
  total: number;
}

export const PaymentSuccess = ({
  orderId,
  email,
  total,
}: PaymentSuccessProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dziękujemy za zakup!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Twoje zamówienie zostało przyjęte i opłacone
        </p>

        {/* Order details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Numer zamówienia</p>
              <p className="font-semibold text-gray-900">#{orderId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Kwota zapłacona</p>
              <p className="font-semibold text-green-600">
                <Price price={total} />
              </p>
            </div>
          </div>
        </div>

        {/* Information about next steps */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 text-left">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Potwierdzenie wysłane
              </h3>

              <p className="text-sm text-gray-600">
                Potwierdzenie zamówienia zostało wysłane na adres{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <LinkButton href="/" size="lg" className="flex-1 sm:flex-initial">
          Wróć do zakupów
        </LinkButton>

        {/* Contact data */}
        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>
            Masz pytania? Skontaktuj się z nami:{" "}
            <a
              href="mailto:kontakt@sklep.pl"
              className="text-primary hover:underline"
            >
              kontakt@sklep.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
