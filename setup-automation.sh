#!/bin/bash

echo "🚀 SUPR Climb Guide - Automatisation Cowork"
echo "==========================================="
echo ""

# Variables
SUPABASE_TOKEN="sbp_6a96da91eec1f03baaea2f454d8d29b9e9af1210"
VERCEL_TOKEN="vcp_3th5ipgldBvHGYCFSAlUGOETJA9Vd3i8q2KqQVo4rvXJ1dmnwX2kSbkz"

echo "✓ Tokens chargés"
echo ""
echo "📦 Étape 1/5 : Création du projet Supabase..."

# Créer le projet Supabase
SUPABASE_PROJECT_RESPONSE=$(curl -s -X POST https://api.supabase.com/v1/projects \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "supr-climb-guide",
    "organization_id": "",
    "plan": "free",
    "region": "eu-central-1",
    "db_pass": "SuprClimb2026!"
  }')

echo "Réponse Supabase: $SUPABASE_PROJECT_RESPONSE"
echo ""
echo "⚠️  Note: La création de projet Supabase via API nécessite un organization_id"
echo "    Je vais te montrer comment finaliser manuellement..."
echo ""

# Instructions pour finaliser
echo "📋 INSTRUCTIONS SIMPLIFIÉES:"
echo ""
echo "1. Va sur https://supabase.com/dashboard"
echo "2. Clique 'New project'"
echo "3. Nom: supr-climb-guide"
echo "4. Password: SuprClimb2026!"
echo "5. Region: Europe (Paris)"
echo "6. Une fois créé, va dans SQL Editor"
echo "7. Copie-colle le SQL ci-dessous"
echo ""
echo "======================== SQL À COPIER ========================"
cat << 'SQLEOF'

-- Tables principales
CREATE TABLE gyms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#FF6B35',
  secondary_color TEXT DEFAULT '#1E3A8A',
  welcome_message TEXT,
  address TEXT,
  hours JSONB,
  instagram_handle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gym_shop_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  promo_price DECIMAL(10,2),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sécurité
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read gyms" ON gyms FOR SELECT USING (true);
CREATE POLICY "Public read items" ON gym_shop_items FOR SELECT USING (true);
CREATE POLICY "Public insert analytics" ON analytics_events FOR INSERT WITH CHECK (true);

-- Données Boulder Space
INSERT INTO gyms (slug, name, logo_url, primary_color, secondary_color, welcome_message, address, instagram_handle)
VALUES (
  'boulder-space',
  'Boulder Space',
  'https://via.placeholder.com/200x100/FF6B35/FFFFFF?text=Boulder+Space',
  '#FF6B35',
  '#1E3A8A',
  'Bienvenue dans l''espace ! Prêt à décoller ? 🚀',
  'Philippines',
  'boulderspace'
);

-- Données Bloc Shop
INSERT INTO gyms (slug, name, logo_url, primary_color, secondary_color, welcome_message, address, instagram_handle)
VALUES (
  'bloc-shop',
  'Bloc Shop',
  'https://via.placeholder.com/200x100/10B981/FFFFFF?text=Bloc+Shop',
  '#10B981',
  '#1F2937',
  'Grimpe, progresse, kiffe. Let''s go ! 💪',
  'Paris, France',
  'blocshopparis'
);

-- Produits Boulder Space
WITH bs AS (SELECT id FROM gyms WHERE slug = 'boulder-space')
INSERT INTO gym_shop_items (gym_id, name, description, price, category, image_url)
SELECT id, 'Magnésie Black Diamond', 'Sac 200g', 8.00, 'chalk', 
  'https://via.placeholder.com/150/CCCCCC/000000?text=Chalk'
FROM bs;

WITH bs AS (SELECT id FROM gyms WHERE slug = 'boulder-space')
INSERT INTO gym_shop_items (gym_id, name, description, price, promo_price, category, image_url)
SELECT id, 'T-shirt Boulder Space', 'Coton bio', 25.00, 20.00, 'apparel',
  'https://via.placeholder.com/150/FF6B35/FFFFFF?text=T-shirt'
FROM bs;

WITH bs AS (SELECT id FROM gyms WHERE slug = 'boulder-space')
INSERT INTO gym_shop_items (gym_id, name, description, price, category, image_url)
SELECT id, 'Brosse escalade', 'Poils naturels', 12.00, 'gear',
  'https://via.placeholder.com/150/8B4513/FFFFFF?text=Brush'
FROM bs;

WITH bs AS (SELECT id FROM gyms WHERE slug = 'boulder-space')
INSERT INTO gym_shop_items (gym_id, name, description, price, category, image_url)
SELECT id, 'Gourde SUPR', '750ml inox', 18.00, 'accessories',
  'https://via.placeholder.com/150/FF6B35/FFFFFF?text=Bottle'
FROM bs;

SQLEOF
echo "=============================================================="
echo ""
echo "8. Une fois le SQL exécuté, va dans Settings > API"
echo "9. Copie:"
echo "   - Project URL"
echo "   - anon public key"
echo ""
echo "10. Reviens ici et donne-moi ces 2 valeurs pour que je déploie sur Vercel"
echo ""

