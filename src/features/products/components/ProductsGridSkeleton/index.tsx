import ProductCardSkeleton from "../ProductCardSkeleton";

interface ProductsGridSkeletonProps {
  count?: number;
  isSectionVariant?: boolean;
}

const ProductsGridSkeleton = ({
  count = 8,
  isSectionVariant,
}: ProductsGridSkeletonProps) => {
  let gridClasses = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (isSectionVariant) {
    gridClasses = `grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`;
  }

  return (
    <div className={`grid ${gridClasses} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductsGridSkeleton;
