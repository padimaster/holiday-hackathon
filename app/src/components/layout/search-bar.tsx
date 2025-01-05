'use client';

import { useRef, useCallback } from "react";
import { Search, X, Globe, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/types/search";
import { useSearch } from "@/hooks/use-search";
import { useSearchHistory } from "@/hooks/useSearchHistory";

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
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const { results, isLoading, error, searchTerm, setSearchTerm } = useSearch();
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();

  // Event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value);
  }, [setSearchTerm, onSearch]);

  const handleResultClick = (result: SearchResult) => {
    setSearchTerm(result.title);
    addToHistory(result);
    onSearch?.(result.title);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  // Render functions
  const renderSearchItem = (item: SearchResult) => (
    <div
      key={item.id}
      onClick={() => handleResultClick(item)}
      className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
          {item.type === 'user' ? (
            <Image
              src={item.avatar || "/placeholder/32/32"}
              alt={item.title}
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {item.type?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium flex items-center gap-1">
            {item.title}
            {item.type === 'user' && item.techScore && (
              <span className="text-xs text-purple-400">
                Tech Score: {item.techScore}
              </span>
            )}
          </span>
          <span className="text-gray-400 text-sm">
            {item.type === 'user' ? `@${item.handle}` : item.type}
          </span>
        </div>
      </div>
      {!searchTerm && (
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

  const showDropdown = searchTerm.trim() || history.length > 0;

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full bg-gray-900 border-gray-800 pl-10 pr-10 py-5 text-gray-200 placeholder:text-gray-400 rounded-full focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
        {!isLoading && searchTerm && (
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
      {showDropdown && (
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
                  {searchTerm ? 'Results' : 'Recent'}
                </span>
                {!searchTerm && history.length > 0 && (
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
                {searchTerm ? (
                  results.length > 0 ? (
                    results.map(result => renderSearchItem(result))
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
                    history.map(item => renderSearchItem(item))
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