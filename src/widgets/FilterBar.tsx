import { Input } from "@/components/design-system/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/design-system/button";

export interface FilterBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

export function FilterBar({ 
  onSearch, 
  placeholder = "Search...", 
  onFilterClick 
}: FilterBarProps) {
  return (
    <div className="flex w-full items-center space-x-2 bg-card p-2 rounded-lg border border-border shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-9 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      {onFilterClick && (
        <div className="border-l border-border pl-2">
          <Button variant="ghost" size="sm" onClick={onFilterClick} className="text-muted-foreground hover:text-foreground">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      )}
    </div>
  );
}
