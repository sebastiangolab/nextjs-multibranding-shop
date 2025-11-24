"use client";

import { useCheckoutStore } from "@/features/checkout";
import { Checkbox } from "@/shared/shadcn/ui/checkbox";
import { Label } from "@/shared/shadcn/ui/label";
import Link from "next/link";

export const LegalConsents = () => {
  const { termsAccepted, updateTermsAccepted } = useCheckoutStore();

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Zgody i regulaminy</h3>

      <div className="space-y-4">
        {/* Store Regulation - required */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={termsAccepted.storeRegulation}
            onCheckedChange={(checked) =>
              updateTermsAccepted({
                storeRegulation: !!checked,
              })
            }
            className="mt-1"
          />

          <div className="flex-1">
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer leading-relaxed"
            >
              Akceptuję{" "}
              <Link
                href="/regulamin"
                className="text-primary hover:underline font-medium"
                target="_blank"
              >
                regulamin sklepu
              </Link>{" "}
              <span className="text-destructive">*</span>
            </Label>
          </div>
        </div>

        {/* Privacy Policy - required */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacy"
            checked={termsAccepted.privacyPolicy}
            onCheckedChange={(checked) =>
              updateTermsAccepted({
                privacyPolicy: !!checked,
              })
            }
            className="mt-1"
          />

          <div className="flex-1">
            <Label
              htmlFor="privacy"
              className="text-sm font-normal cursor-pointer leading-relaxed"
            >
              Akceptuję{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-primary hover:underline font-medium"
                target="_blank"
              >
                politykę prywatności
              </Link>{" "}
              <span className="text-destructive">*</span>
            </Label>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <p className="text-xs text-muted-foreground mb-3">Opcjonalne:</p>

          {/* Marketing - optional */}
          <div className="flex items-start space-x-3 mb-3">
            <Checkbox
              id="marketing"
              checked={termsAccepted.marketing}
              onCheckedChange={(checked) =>
                updateTermsAccepted({
                  marketing: !!checked,
                })
              }
              className="mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="marketing"
                className="text-sm font-normal cursor-pointer leading-relaxed text-foreground/80"
              >
                Wyrażam zgodę na przetwarzanie moich danych osobowych w celach
                marketingowych
              </Label>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-5">
          <span className="text-destructive">*</span> Pola wymagane
        </div>
      </div>
    </div>
  );
};
