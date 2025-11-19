import { ChefHat, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ChefHat className="h-8 w-8 text-primary" />
            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-secondary animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Receitas da Done Nê
          </h1>
        </div>
      </div>
    </header>
  );
};
