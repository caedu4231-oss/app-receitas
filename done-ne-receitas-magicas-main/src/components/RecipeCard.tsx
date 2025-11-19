import { Heart, Clock, DollarSign, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import defaultRecipeImage from "@/assets/default-recipe.jpg";

interface RecipeCardProps {
  id: string;
  name: string;
  prepTime?: string;
  price?: string;
  imageUrl?: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export const RecipeCard = ({
  name,
  prepTime,
  price,
  imageUrl,
  isFavorite,
  onToggleFavorite,
  onClick,
  id,
}: RecipeCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_-6px_hsl(0_65%_55%/0.25)] cursor-pointer border-border/50"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl || defaultRecipeImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </Button>

        {price && (
          <Badge 
            className="absolute bottom-3 right-3 bg-secondary/90 backdrop-blur-sm text-secondary-foreground font-semibold"
          >
            <DollarSign className="h-3 w-3 mr-1" />
            {price}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {prepTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{prepTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>Done Nê</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
