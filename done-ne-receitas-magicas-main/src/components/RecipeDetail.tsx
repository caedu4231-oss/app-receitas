import { X, Clock, Users, DollarSign, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import defaultRecipeImage from "@/assets/default-recipe.jpg";

interface Recipe {
  id: string;
  name: string;
  ingredients: Array<{ item: string; quantity?: string }> | string[];
  instructions: string[];
  prep_time?: string;
  servings?: string;
  storage_info?: string;
  price?: string;
  image_url?: string;
}

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

export const RecipeDetail = ({ recipe, open, onClose }: RecipeDetailProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={recipe.image_url || defaultRecipeImage}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold">{recipe.name}</h2>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-16rem)]">
          <div className="p-6 space-y-6">
            {/* Informações principais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.prep_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tempo</p>
                    <p className="font-semibold">{recipe.prep_time}</p>
                  </div>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rendimento</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                </div>
              )}
              {recipe.price && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Preço</p>
                    <p className="font-semibold">{recipe.price}</p>
                  </div>
                </div>
              )}
              {recipe.storage_info && (
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Armazenamento</p>
                    <p className="font-semibold text-sm">{recipe.storage_info}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Ingredientes */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Ingredientes
              </h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const ingredientText = typeof ingredient === 'string' 
                    ? ingredient 
                    : `${ingredient.quantity || ''} ${ingredient.item}`.trim();
                  
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <p className="text-foreground flex-1">{ingredientText}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Modo de Preparo */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Modo de Preparo
              </h3>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-foreground flex-1 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
