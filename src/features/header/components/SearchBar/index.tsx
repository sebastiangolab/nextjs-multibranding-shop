"use client";

import { Button } from "@shared/shadcn/ui/button";
import { Input } from "@shared/shadcn/ui/input";
import { Search } from "lucide-react";
import { FormEvent } from "react";

export const SearchBar = () => {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md">
      <Input
        type="search"
        placeholder="Wyszukaj produkt"
        className="flex-1 h-10"
      />

      <Button
        type="submit"
        size="icon"
        variant="outline"
        className="h-10 w-10 ml-1"
      >
        <Search className="size-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
