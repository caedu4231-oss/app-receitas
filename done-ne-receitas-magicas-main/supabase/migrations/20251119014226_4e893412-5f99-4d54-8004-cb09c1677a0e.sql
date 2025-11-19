-- Criar storage bucket para PDFs de receitas
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-pdfs', 'recipe-pdfs', false);

-- Criar storage bucket para imagens das receitas
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true);

-- Criar tabela de receitas
CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  instructions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  prep_time TEXT,
  servings TEXT,
  storage_info TEXT,
  price TEXT,
  image_url TEXT,
  pdf_url TEXT,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (não requer autenticação para este caso)
CREATE POLICY "Recipes são visíveis por todos" 
ON public.recipes 
FOR SELECT 
USING (true);

CREATE POLICY "Qualquer um pode criar receitas" 
ON public.recipes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Qualquer um pode atualizar receitas" 
ON public.recipes 
FOR UPDATE 
USING (true);

CREATE POLICY "Qualquer um pode deletar receitas" 
ON public.recipes 
FOR DELETE 
USING (true);

-- Políticas de storage para PDFs
CREATE POLICY "PDFs são visíveis por todos"
ON storage.objects FOR SELECT
USING (bucket_id = 'recipe-pdfs');

CREATE POLICY "Qualquer um pode fazer upload de PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'recipe-pdfs');

-- Políticas de storage para imagens
CREATE POLICY "Imagens são visíveis por todos"
ON storage.objects FOR SELECT
USING (bucket_id = 'recipe-images');

CREATE POLICY "Qualquer um pode fazer upload de imagens"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'recipe-images');

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_recipes_updated_at
BEFORE UPDATE ON public.recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();