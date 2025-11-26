"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Price } from "@/features/prices";
import { getProductsData, ProductData } from "@features/products";
import { Button } from "@shared/shadcn/ui/button";
import { Input } from "@shared/shadcn/ui/input";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isResultsDropdownOpen, setIsResultsDropdownOpen] =
    useState<boolean>(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  // Ref for handling outside clicks
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle input change
  const handleSearchInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    setSearchQuery(event.target.value);
  };

  // Handle form submission - redirect to search results page
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      window.location.href = `/szukaj?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Close results dropdown and clear products
  const closeResultsDropdown = () => {
    setProducts([]);
    setIsResultsDropdownOpen(false);
  };

  // Clear search input and reset state
  const handleClear = () => {
    setSearchQuery("");
    closeResultsDropdown();
  };

  // Close dropdown when clicking outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeResultsDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch products when debounced search query changes
  useEffect(() => {
    // Reset if query is too short
    if (debouncedSearchQuery.trim().length < 2) {
      closeResultsDropdown();
      return;
    }

    // Fetch products based on search query
    const fetchProducts = async () => {
      setIsLoading(true);

      const results = await getProductsData({
        phrase: debouncedSearchQuery,
        perPage: 5,
      });

      if (results) {
        setProducts(results.products);
        setIsResultsDropdownOpen(true);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, [debouncedSearchQuery]);

  return (
    <>
      {/* Overlay */}
      {isResultsDropdownOpen && products.length > 0 && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 animate-in fade-in-0"
          onClick={() => setIsResultsDropdownOpen(false)}
        />
      )}

      {/* Search Container */}
      <div ref={searchRef} className="relative w-full max-w-md z-50">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Wyszukaj produkt"
              className="flex-1 h-10 pr-8 bg-background border-border"
              value={searchQuery}
              onChange={handleSearchInputOnChange}
              onFocus={() => {
                if (products.length > 0) setIsResultsDropdownOpen(true);
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <Button
            type="submit"
            size="icon"
            variant="outline"
            className="h-10 w-10 ml-1"
          >
            <Search className="size-4" />
          </Button>
        </form>

        {/* Dropdown Results */}
        {isResultsDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border z-50 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Ładowanie...
              </div>
            ) : null}

            {!isLoading && products.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Brak wyników dla &quot;{searchQuery}&quot;
              </div>
            ) : null}

            {!isLoading && products.length > 0 ? (
              <>
                <div className="divide-y">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/p/${product.slug}`}
                      onClick={() => setIsResultsDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 bg-muted rounded">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Search className="size-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {product.name}
                        </h4>

                        <p className="text-primary font-semibold mt-1">
                          <Price price={product.price} />
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {searchQuery && (
                  <Link
                    href={`/szukaj?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsResultsDropdownOpen(false)}
                    className="block p-3 text-center text-sm text-primary hover:bg-accent border-t font-medium"
                  >
                    Zobacz wszystkie wyniki
                  </Link>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
