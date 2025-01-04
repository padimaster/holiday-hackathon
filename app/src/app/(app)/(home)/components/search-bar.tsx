"use client";

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { Search, X, Globe, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/types/search";
import { useSearch } from "@/hooks/layout/useSearch";
import { useDebounce } from "@/hooks/layout/useDebounce";
import { useSearchHistory } from "@/hooks/layout/useSearchHistory";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  className,
  placeholder = "Search" 
}: SearchBarProps) {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { results, isLoading, error, performSearch } = useSearch();
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();

  // Effects
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
    setIsDropdownOpen(true);
  }, [onSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const items = showResults ? results : history;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case "Enter":
        if (selectedIndex > -1 && items[selectedIndex]) {
          handleResultClick(items[selectedIndex]);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery(result.name);
    addToHistory(result);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    onSearch?.(result.name);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    setShowResults(false);
    onSearch?.("");
  };

  // Render functions
  const renderSearchItem = (item: SearchResult, index: number) => (
    <div
      key={item.id}
      onClick={() => handleResultClick(item)}
      className={cn(
        "flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer",
        selectedIndex === index && "bg-gray-800"
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
          <Image
            src={item.avatar || "/placeholder/32/32"}
            alt={item.name}
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium flex items-center gap-1">
            {item.name}
          </span>
          <span className="text-gray-400 text-sm">{item.handle}</span>
        </div>
      </div>
      {!showResults && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromHistory(item.id);
          }}
          className="text-gray-400 hover:text-gray-300"
          type="button"
          aria-label="Remove from history"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={placeholder}
          className="w-full bg-gray-900 border-gray-800 pl-10 pr-10 py-5 text-gray-200 placeholder:text-gray-400 rounded-full focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
        {!isLoading && searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            type="button"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-gray-900 rounded-lg border border-gray-800 shadow-lg overflow-hidden z-50"
        >
          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="m-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Search Results or History */}
          {!error && (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <span className="text-lg font-semibold text-white">
                  {showResults ? 'Results' : 'Recent'}
                </span>
                {!showResults && history.length > 0 && (
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-400 px-2 py-1 h-auto text-sm"
                    onClick={clearHistory}
                    type="button"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {showResults ? (
                  results.length > 0 ? (
                    results.map((result, index) => renderSearchItem(result, index))
                  ) : (
                    !isLoading && (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <Globe className="h-8 w-8 mb-2" />
                        <p>No results found</p>
                      </div>
                    )
                  )
                ) : (
                  history.length > 0 ? (
                    history.map((item, index) => renderSearchItem(item, index))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Globe className="h-8 w-8 mb-2" />
                      <p>No recent searches</p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}