"use client";

import { ArrowLeft, CreditCard, ShoppingCart, Truck } from "lucide-react";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutStep } from "@/features/checkout";
import { LinkButton } from "@/shared/components/LinkButton";
import { HeaderData } from "../../types";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

const CHECKOUT_STEPS = [
  {
    id: CheckoutStep.CART,
    label: "Koszyk",
    path: "/koszyk",
    icon: ShoppingCart,
  },
  {
    id: CheckoutStep.DELIVERY,
    label: "Dostawa",
    path: "/dostawa",
    icon: Truck,
  },
  {
    id: CheckoutStep.PAYMENT,
    label: "Płatność",
    path: "/platnosc",
    icon: CreditCard,
  },
];

interface CheckoutHeaderProps {
  logoData: HeaderData["logoData"];
  logoDarkData?: HeaderData["logoDarkModeData"];
  currentStep: CheckoutStep;
}

const CheckoutHeaderClient = ({
  logoData,
  logoDarkData,
  currentStep,
}: CheckoutHeaderProps) => {
  const { availableThemeToggle } = getBrandConfig();

  const currentStepIndex = CHECKOUT_STEPS.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <header className="border-b bg-card top-0 z-40 px-4">
      <div className="flex items-center justify-between container mx-auto py-4">
        {/* Logo */}
        <Logo logoData={logoData} logoDarkData={logoDarkData} />

        {/* Checkout steps */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center px-4">
          {CHECKOUT_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className={`
                      text-sm font-medium hidden lg:block
                      ${
                        step.id === currentStep
                          ? "text-primary"
                          : step.id < currentStep
                            ? "text-primary/80"
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
                      ${step.id < currentStep ? "bg-primary/80" : "bg-muted"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Button "Back to shopping" */}
        <div className="flex-shrink-0">
          <LinkButton variant="outline" href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">Wróć do zakupów</span>

            <span className="sm:hidden">Wróć</span>
          </LinkButton>
        </div>

        {/* Theme Toggle */}
        {availableThemeToggle ? (
          <div className="pl-2 border-l-2 ml-4">
            <ThemeToggle />
          </div>
        ) : null}
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
                        ? "bg-primary/80"
                        : "bg-muted"
                  }
                `}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Krok {currentStepIndex + 1} z {CHECKOUT_STEPS.length}:{" "}
          {CHECKOUT_STEPS[currentStepIndex]?.label}
        </p>
      </div>
    </header>
  );
};

export default CheckoutHeaderClient;
