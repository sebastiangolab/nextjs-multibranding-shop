import { usePathname } from "next/navigation";

interface BreadcrumbItem {
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

export const useBreadcrumb = (currentPageLabel: string): BreadcrumbItem[] => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [];

  // Always add home page
  items.push({
    label: breadcrumbLabels.home,
    href: "/",
    isCurrentPage: pathSegments.length === 0,
  });

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
