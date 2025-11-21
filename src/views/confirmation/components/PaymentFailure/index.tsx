"use client";

import { LinkButton } from "@/shared/components/LinkButton";
import { XCircle, RefreshCcw, HelpCircle } from "lucide-react";

export const PaymentFailure = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Płatność nie powiodła się
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Nie martw się, nie pobraliśmy żadnych środków z Twojego konta
        </p>

        {/* Possible causes */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Możliwe przyczyny
          </h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Brak wystarczających środków na karcie</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Karta wygasła lub jest zablokowana</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Bank odrzucił transakcję</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Nieprawidłowe dane karty</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Przekroczono limit transakcji</span>
            </li>
          </ul>
        </div>

        {/* What next? */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
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
        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p className="mb-2">Potrzebujesz pomocy?</p>

          <p>
            Skontaktuj się z nami:{" "}
            <a
              href="mailto:kontakt@sklep.pl"
              className="text-primary hover:underline"
            >
              kontakt@sklep.pl
            </a>{" "}
            lub{" "}
            <a href="tel:+48111111111" className="text-primary hover:underline">
              +48 111 111 111
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
