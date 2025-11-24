"use client";

import { LinkButton } from "@/shared/components/LinkButton";
import { Clock, Loader2 } from "lucide-react";

interface PaymentProcessingProps {
  orderId: string;
  email: string;
}

export const PaymentProcessing = ({
  orderId,
  email,
}: PaymentProcessingProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Przetwarzamy płatność...
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Twoja płatność jest weryfikowana przez bank
        </p>

        {/* Loader */}
        <div className="flex justify-center mb-8">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>

        {/* Details */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Numer zamówienia
              </p>
              <p className="font-semibold text-foreground">#{orderId}</p>
            </div>

            {email.length > 0 ? (
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Email potwierdzenia
                </p>

                <p className="font-semibold text-foreground">{email}</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Information about payment processing */}
        <div className="bg-accent border border-accent rounded-lg p-4 mb-8">
          <p className="text-sm text-accent-foreground">
            ⏱️ Weryfikacja płatności może potrwać. Wyślemy Ci email z
            potwierdzeniem gdy płatność zostanie zrealizowana.
          </p>
        </div>

        {/* Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <LinkButton href="/" size="lg" className="flex-1 sm:flex-initial">
            Wróć do sklepu
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
