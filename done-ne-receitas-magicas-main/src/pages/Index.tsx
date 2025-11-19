import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-christmas.jpg";

interface Recipe {
  id: string;
  name: string;
  ingredients: any;
  instructions: string[];
  prep_time?: string;
  servings?: string;
  storage_info?: string;
  price?: string;
  image_url?: string;
  is_favorite: boolean;
}

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterAndSortRecipes();
  }, [recipes, searchQuery, sortBy, showFavoritesOnly]);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar receitas",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setRecipes(data || []);
  };

  const filterAndSortRecipes = () => {
    let filtered = [...recipes];

    // Filtrar por favoritos
    if (showFavoritesOnly) {
      filtered = filtered.filter((r) => r.is_favorite);
    }

    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((r) => {
        const nameMatch = r.name.toLowerCase().includes(query);
        const ingredientsMatch = JSON.stringify(r.ingredients).toLowerCase().includes(query);
        return nameMatch || ingredientsMatch;
      });
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "date") {
        return 0; // Já ordenado por created_at na query
      } else if (sortBy === "price") {
        const priceA = parseFloat(a.price?.replace(/[^\d,]/g, "").replace(",", ".") || "0");
        const priceB = parseFloat(b.price?.replace(/[^\d,]/g, "").replace(",", ".") || "0");
        return priceA - priceB;
      }
      return 0;
    });

    setFilteredRecipes(filtered);
  };

  const toggleFavorite = async (id: string) => {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;

    const { error } = await supabase
      .from("recipes")
      .update({ is_favorite: !recipe.is_favorite })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao atualizar favorito",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setRecipes(recipes.map((r) => (r.id === id ? { ...r, is_favorite: !r.is_favorite } : r)));
    
    toast({
      title: recipe.is_favorite ? "Removida dos favoritos" : "Adicionada aos favoritos",
      description: recipe.name,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative container h-full flex flex-col items-center justify-center text-center text-white space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
            Suas Receitas Especiais 🎄
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">
            Organize, compartilhe e prepare delícias com amor
          </p>
          <Button 
            size="lg" 
            variant="hero"
            className="text-lg font-semibold"
          >
            <Upload className="mr-2 h-5 w-5" />
            Adicionar Nova Receita
          </Button>
        </div>
      </section>

      {/* Catálogo de Receitas */}
      <section className="container py-12 space-y-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {searchQuery || showFavoritesOnly
                ? "Nenhuma receita encontrada"
                : "Nenhuma receita ainda. Adicione sua primeira receita!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                prepTime={recipe.prep_time}
                price={recipe.price}
                imageUrl={recipe.image_url}
                isFavorite={recipe.is_favorite}
                onToggleFavorite={toggleFavorite}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        )}
      </section>

      <RecipeDetail
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Index;
