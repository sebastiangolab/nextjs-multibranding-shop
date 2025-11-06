import { Card, CardContent } from "@shared/shadcn/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-4/3 bg-muted relative overflow-hidden animate-pulse">
        <div className="w-full h-full bg-gray-200" />
      </div>

      <CardContent className="px-4 pb-6 pt-0">
        <div className="space-y-2">
          {/* Tytuł produktu - 2 linie */}
          <div className="space-y-2 mb-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>

          <div className="flex items-center justify-between">
            {/* Cena */}
            <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />

            {/* Przycisk */}
            <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
