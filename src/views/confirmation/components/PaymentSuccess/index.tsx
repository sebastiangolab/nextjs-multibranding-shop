"use client";

import { CheckCircle, Mail } from "lucide-react";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Price } from "@/features/prices";
import { LinkButton } from "@/shared/components/LinkButton";

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
  const { contact } = getBrandConfig();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Dziękujemy za zakup!
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Twoje zamówienie zostało przyjęte i opłacone
        </p>

        {/* Order details */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Numer zamówienia
              </p>
              <p className="font-semibold text-foreground">#{orderId}</p>
            </div>

            {total ? (
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Kwota zapłacona
                </p>

                <p className="font-semibold text-green-600">
                  <Price price={total} />
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Information about next steps */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 text-left">
            <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent-foreground" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Potwierdzenie wysłane
              </h3>

              <p className="text-sm text-muted-foreground">
                Potwierdzenie zamówienia zostało wysłane na adres{" "}
                {email.length > 0 ? (
                  <span className="font-medium">{email}</span>
                ) : (
                  "email podany przy zamówieniu"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <LinkButton href="/" size="lg" className="flex-1 sm:flex-initial">
          Wróć do sklepu
        </LinkButton>

        {/* Contact data */}
        <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
          <p>
            Masz pytania? Skontaktuj się z nami:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
