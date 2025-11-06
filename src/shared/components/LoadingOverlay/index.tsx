import { Loader2 } from "lucide-react";

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]">
      <div className="bg-background rounded-lg p-3 shadow-xl">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    </div>
  );
};
