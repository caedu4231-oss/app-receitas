import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  onToggleFavorites,
}: SearchBarProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por receita ou ingrediente..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 border-border/50 focus-visible:ring-primary"
          />
        </div>

        <div className="flex gap-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px] h-12 border-border/50">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome (A-Z)</SelectItem>
              <SelectItem value="date">Mais recentes</SelectItem>
              <SelectItem value="price">Preço</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            className="h-12 px-6"
            onClick={onToggleFavorites}
          >
            ❤️ Favoritas
          </Button>
        </div>
      </div>
    </div>
  );
};
