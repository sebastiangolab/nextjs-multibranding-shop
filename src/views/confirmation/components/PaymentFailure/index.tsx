"use client";

import { HelpCircle, RefreshCcw, XCircle } from "lucide-react";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { LinkButton } from "@/shared/components/LinkButton";

export const PaymentFailure = () => {
  const { contact } = getBrandConfig();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Płatność nie powiodła się
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Nie martw się, nie pobraliśmy żadnych środków z Twojego konta
        </p>

        {/* Possible causes */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Możliwe przyczyny
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">•</span>
              <span>Brak wystarczających środków na karcie</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">•</span>
              <span>Karta wygasła lub jest zablokowana</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">•</span>
              <span>Bank odrzucił transakcję</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">•</span>
              <span>Nieprawidłowe dane karty</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">•</span>
              <span>Przekroczono limit transakcji</span>
            </li>
          </ul>
        </div>

        {/* What next? */}
        <div className="bg-accent border border-accent rounded-lg p-4 mb-8">
          <p className="text-sm text-accent-foreground">
            💡 <strong>Wskazówka:</strong> Sprawdź dane karty i spróbuj
            ponownie, lub skontaktuj się ze swoim bankiem, aby upewnić się, że
            transakcje online są dozwolone.
          </p>
        </div>

        {/* Przyciski akcji */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <LinkButton
            href="/platnosc"
            size="lg"
            className="flex-1 sm:flex-initial"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Spróbuj ponownie
          </LinkButton>

          <LinkButton
            href="/koszyk"
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-initial"
          >
            Wróć do koszyka
          </LinkButton>
        </div>

        {/* Help */}
        <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
          <p className="mb-2">Potrzebujesz pomocy?</p>

          <p>
            Skontaktuj się z nami:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline"
            >
              {contact.email}
            </a>{" "}
            lub{" "}
            <a
              href={`tel:${contact.phone}`}
              className="text-primary hover:underline"
            >
              {contact.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
