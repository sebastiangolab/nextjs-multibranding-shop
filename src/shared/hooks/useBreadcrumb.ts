import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

const breadcrumbLabels = {
  home: "Start",
};

const formatPathSegmentLabel = (pathSegment: string): string => {
  return pathSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const useBreadcrumb = (
  currentPageLabel: string,
  categoriesItems?: BreadcrumbItem[],
  isCategoryCurrentPage?: boolean,
): BreadcrumbItem[] => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [];

  // Always add home page
  items.push({
    label: breadcrumbLabels.home,
    href: "/",
    isCurrentPage: pathSegments.length === 0,
  });

  // Add category items if provided
  if (categoriesItems && categoriesItems.length > 0) {
    items.push({
      label: "Kategorie",
      href: "/kategorie",
    });

    categoriesItems.forEach((item) => {
      items.push(item);
    });

    if (isCategoryCurrentPage) {
      return items.map((item, index) =>
        index === items.length - 1 ? { ...item, isCurrentPage: true } : item,
      );
    }

    // Add current page if it's not a category page
    if (!isCategoryCurrentPage) {
      items.push({
        label: currentPageLabel,
        href: pathname,
        isCurrentPage: true,
      });
    }

    return items;
  }

  // If we are on the home page, return only it
  if (pathSegments.length === 0) {
    return items;
  }

  // Generate elements for each path segment
  let currentPath = "";

  pathSegments.forEach((pathSegment, index) => {
    currentPath += `/${pathSegment}`;

    const isLast = index === pathSegments.length - 1;

    // Decode URL segment (in case of special characters)
    const decodedSegment = decodeURIComponent(pathSegment);

    const label = formatPathSegmentLabel(decodedSegment);

    items.push({
      label: isLast && currentPageLabel ? currentPageLabel : label,
      href: currentPath,
      isCurrentPage: isLast,
    });
  });

  return items;
};
