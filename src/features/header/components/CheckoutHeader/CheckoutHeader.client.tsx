"use client";

import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/shared/components/LinkButton";
import Logo from "../Logo";
import { HeaderData } from "../../types";

const CHECKOUT_STEPS = [
  { id: 1, label: "Koszyk", path: "/koszyk" },
  { id: 2, label: "Dostawa", path: "/dostawa" },
  { id: 3, label: "Płatność", path: "/platnosc" },
];

interface CheckoutHeaderProps {
  logoData: HeaderData["logoData"];
  currentStep?: number;
}

const CheckoutHeaderClient = ({
  logoData,
  currentStep = 1,
}: CheckoutHeaderProps) => {
  return (
    <header className="border-b bg-white top-0 z-40">
      <div className="flex items-center justify-between container mx-auto py-4">
        {/* Logo */}
        <Logo data={logoData} />

        {/* Checkout steps */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center px-4">
          {CHECKOUT_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                            ? "bg-green-600 text-white"
                            : "bg-muted text-muted-foreground"
                      }
                    `}
                >
                  {step.id < currentStep ? "✓" : step.id}
                </div>

                <span
                  className={`
                      text-sm font-medium hidden lg:block
                      ${
                        step.id === currentStep
                          ? "text-primary"
                          : step.id < currentStep
                            ? "text-green-600"
                            : "text-muted-foreground"
                      }
                    `}
                >
                  {step.label}
                </span>
              </div>

              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={`
                      w-8 lg:w-12 h-0.5 mx-2
                      ${step.id < currentStep ? "bg-green-600" : "bg-muted"}
                    `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Button "Back to shopping" */}
        <div className="flex-shrink-0">
          <LinkButton variant="outline" href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">Wróć do zakupów</span>

            <span className="sm:hidden">Wróć</span>
          </LinkButton>
        </div>
      </div>

      {/* Mobile steps */}
      <div className="md:hidden pb-4">
        <div className="flex items-center justify-center gap-2">
          {CHECKOUT_STEPS.map((step) => (
            <div
              key={step.id}
              className={`
                  h-1 flex-1 rounded-full
                  ${
                    step.id === currentStep
                      ? "bg-primary"
                      : step.id < currentStep
                        ? "bg-green-600"
                        : "bg-muted"
                  }
                `}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Krok {currentStep} z {CHECKOUT_STEPS.length}:{" "}
          {CHECKOUT_STEPS[currentStep - 1]?.label}
        </p>
      </div>
    </header>
  );
};

export default CheckoutHeaderClient;
