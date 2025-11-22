import { Home } from "lucide-react";
import { LinkButton } from "../LinkButton";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>

          <h2 className="text-3xl font-semibold text-foreground">
            Strona nie została znaleziona
          </h2>

          <p className="text-muted-foreground text-lg">
            Przepraszamy, ale strona której szukasz nie istnieje lub została
            przeniesiona.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <LinkButton
            asChild
            size="lg"
            href="/"
            className="flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Strona główna
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
