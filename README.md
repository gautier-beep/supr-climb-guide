# SUPR Climb Guide - v0.1

Application web progressive pour accompagner les grimpeurs débutants en salle d'escalade.

## 🚀 Déploiement Rapide (10 minutes)

### Étape 1 : Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com)
2. Clique "Start your project" (gratuit)
3. Crée une organisation
4. Crée un nouveau projet :
   - Nom : `supr-climb-guide`
   - Mot de passe database : note-le bien
   - Région : Europe (Paris)
5. Attends 2 minutes que le projet se crée

### Étape 2 : Créer les tables SQL

Dans Supabase, va dans **SQL Editor** et exécute ce code :

```sql
-- Table des salles
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

-- Table des produits boutique
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

-- Table analytics
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies (lecture publique pour tout le monde)
CREATE POLICY "Gyms are viewable by everyone" ON gyms FOR SELECT USING (true);
CREATE POLICY "Shop items are viewable by everyone" ON gym_shop_items FOR SELECT USING (true);
CREATE POLICY "Analytics can be inserted by everyone" ON analytics_events FOR INSERT WITH CHECK (true);

-- Données de test : Boulder Space
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

-- Données de test : Bloc Shop
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

-- Produits de test pour Boulder Space
INSERT INTO gym_shop_items (gym_id, name, description, price, category, image_url)
SELECT 
  id,
  'Magnésie Black Diamond',
  'Sac 200g',
  8.00,
  'chalk',
  'https://via.placeholder.com/150x150/FFFFFF/000000?text=Chalk'
FROM gyms WHERE slug = 'boulder-space';

INSERT INTO gym_shop_items (gym_id, name, description, price, promo_price, category, image_url)
SELECT 
  id,
  'T-shirt Boulder Space',
  'Coton bio',
  25.00,
  20.00,
  'apparel',
  'https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=T-shirt'
FROM gyms WHERE slug = 'boulder-space';
```

### Étape 3 : Récupérer les clés Supabase

Dans Supabase, va dans **Settings** > **API** et copie :
- `Project URL` (ex: https://xxxxx.supabase.co)
jxcspdrlccdosbfryqaq
- `anon public` key (longue chaîne de caractères)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Y3NwZHJsY2Nkb3NiZnJ5cWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTk4MDYsImV4cCI6MjA5NDMzNTgwNn0.ypdMAKPv1JYJnE9b2vBp6vhMI4s9DMYOfmkatrnM4EU

### Étape 4 : Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Connecte-toi avec GitHub
3. Clique "Add New" > "Project"
4. Importe ce dossier (Upload ou connect GitHub)
5. Avant de déployer, configure les **Environment Variables** :
   - `NEXT_PUBLIC_SUPABASE_URL` = ton Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = ta anon key
6. Clique "Deploy"
7. Attends 2-3 minutes

### Étape 5 : Tester

Ton app est live ! Accède à :
- `https://ton-app.vercel.app/boulder-space`
- `https://ton-app.vercel.app/bloc-shop`

## 🔧 Développement Local

Si tu veux modifier l'app sur ton ordi :

```bash
# 1. Installer Node.js (https://nodejs.org)
# 2. Dans le terminal, aller dans le dossier du projet
cd supr-climb-guide

# 3. Créer le fichier .env.local
cp .env.local.example .env.local
# Éditer .env.local avec tes vraies clés Supabase

# 4. Installer les dépendances
npm install

# 5. Lancer le serveur de dev
npm run dev

# 6. Ouvrir http://localhost:3000/boulder-space
```

## 📱 Ajouter une nouvelle salle

### Via SQL (Supabase)

```sql
INSERT INTO gyms (slug, name, logo_url, primary_color, secondary_color, welcome_message, address, instagram_handle)
VALUES (
  'ma-salle',  -- URL : /ma-salle
  'Ma Super Salle',
  'https://example.com/logo.png',
  '#FF6B35',  -- Couleur primaire (orange)
  '#1E3A8A',  -- Couleur secondaire (bleu)
  'Bienvenue chez nous ! 🧗',
  '123 Rue de la Grimpe, Paris',
  'masalle_insta'
);
```

### Ajouter des produits boutique

```sql
-- D'abord, récupère l'ID de ta salle
SELECT id FROM gyms WHERE slug = 'ma-salle';

-- Ensuite ajoute des produits
INSERT INTO gym_shop_items (gym_id, name, description, price, category, image_url)
VALUES (
  'uuid-de-ta-salle',
  'Magnésie',
  'Sac 200g',
  8.00,
  'chalk',
  'https://example.com/chalk.jpg'
);
```

## 🎨 Personnaliser les couleurs

Les couleurs de la salle sont dans la table `gyms` :
- `primary_color` : couleur principale (utilisée pour les accents)
- `secondary_color` : couleur secondaire

Format : code hexadécimal (ex: `#FF6B35`)

## 📊 Analytics

Les événements sont trackés automatiquement dans `analytics_events` :
- `page_view` : visite de la page d'accueil
- `video_play` : lecture d'une vidéo tuto
- `shop_click` : clic sur un produit
- `instagram_share` : partage Instagram

Pour voir les stats d'une salle :

```sql
SELECT 
  event_type,
  COUNT(*) as count,
  DATE(created_at) as date
FROM analytics_events
WHERE gym_id = (SELECT id FROM gyms WHERE slug = 'boulder-space')
GROUP BY event_type, DATE(created_at)
ORDER BY date DESC;
```

## 🔐 Sécurité

- ✅ Les données sont publiques en lecture (pas de login requis)
- ✅ Pas de données sensibles stockées
- ✅ Row Level Security activé sur Supabase
- ✅ Seules les analytics peuvent être insérées par tout le monde

## 📦 Structure du projet

```
supr-climb-guide/
├── app/
│   ├── [gym_slug]/           # Routes dynamiques par salle
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── learn/page.tsx    # Tutos vidéo
│   │   ├── gym/page.tsx      # Infos salle + boutique
│   │   ├── discover/page.tsx # Découverte escalade
│   │   └── share/page.tsx    # Partage Instagram
│   ├── globals.css           # Styles globaux
│   └── layout.tsx            # Layout principal
├── lib/
│   └── supabase.ts           # Client Supabase
├── package.json
└── README.md
```

## 🚀 Prochaines fonctionnalités (v0.2)

- [ ] Dashboard admin (ajouter salles via interface)
- [ ] Vraies vidéos tutos (intégration Vimeo)
- [ ] Paiement boutique (Stripe)
- [ ] Génération réelle des stories Instagram
- [ ] PWA installable (mode offline)
- [ ] Tracking session (profil grimpeur)

## 🐛 Problèmes courants

**L'app ne charge pas les données**
→ Vérifie que tes clés Supabase sont correctes dans Vercel

**Erreur "Gym not found"**
→ Vérifie que le slug dans l'URL correspond à un slug dans la table `gyms`

**Les couleurs ne s'appliquent pas**
→ Vérifie que `primary_color` et `secondary_color` sont bien des codes hex (ex: #FF6B35)

## 📞 Support

Questions ? Contact : [ton-email@supr.com]

---

**Version:** 0.1.0  
**Dernière mise à jour:** Mai 2026  
**Développé avec:** Next.js 14 + Supabase + Tailwind CSS
