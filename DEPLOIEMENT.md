# 🚀 DÉPLOIEMENT V1.0 - 5 MINUTES

## ⚡ ÉTAPES RAPIDES

### 1️⃣ GITHUB (1 min)
```bash
cd /chemin/vers/supr-v1-FINAL
git init
git add .
git commit -m "v1.0 - Clean deployment"
git remote add origin https://github.com/gautier-beep/supr-climb-guide.git
git push -u origin main
```

### 2️⃣ VERCEL (2 min)
1. Va sur https://vercel.com
2. New Project → Import from GitHub
3. Sélectionne `supr-climb-guide`
4. Configure les variables :
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://jxcspdrlccdosbfryqaq.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Y3NwZHJsY2Nkb3NiZnJ5cWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTk4MDYsImV4cCI6MjA5NDMzNTgwNn0.ypdMAKPv1JYJnE9b2vBp6vhMI4s9DMYOfmkatrnM4EU`
5. Deploy !

### 3️⃣ SUPABASE (2 min)
1. Va sur https://supabase.com/dashboard/project/jxcspdrlccdosbfryqaq/sql
2. Copie-colle le SQL ci-dessous
3. Run !

```sql
-- Vérifie que Bloc en Stock existe
INSERT INTO gyms (slug, name, logo_url, primary_color, secondary_color, welcome_message, address, instagram_handle)
VALUES (
  'bloc-en-stock',
  'Bloc en Stock',
  'https://via.placeholder.com/200x100/FF6B35/000000?text=Bloc+en+Stock',
  '#FF6B35',
  '#1C1C1C',
  'Bienvenue à Bloc en Stock ! 1500m² de bloc dans un décor industriel. Grimpe, progresse, partage ! 🧗',
  '1a Rue La Fayette, 67100 Strasbourg',
  'blocenstock'
)
ON CONFLICT (slug) DO NOTHING;
```

## ✅ URLS À TESTER

Après déploiement Vercel (2-3 min) :

- https://[ton-url].vercel.app/boulder-space
- https://[ton-url].vercel.app/bloc-en-stock/beginner-wall
- https://[ton-url].vercel.app/bloc-en-stock/admin (password: `supr2026`)

### Sessions grimpeur (RLS Supabase)

Si le profil affiche « Impossible de créer la session », exécute dans **Supabase → SQL Editor** le fichier :

`scripts/setup-sessions-rls.sql`

Cela autorise les inserts anonymes sur `sessions`, `routes_progress` et `badges` (PoC V1).

Sans ce script, l’app utilise un **mode local** (localStorage) : le parcours fonctionne, mais le classement global reste vide.
- https://[ton-url].vercel.app/about-supr

## 🎯 NOUVEAUTÉS V1.0

✅ Page Beginner Wall dédiée
✅ Dashboard Admin (analytics)
✅ QR Code generator
✅ Page About SUPR
✅ Navigation sticky mobile
✅ Tracking Instagram shares

## 📞 SUPPORT

Problème ? Tu me ping et je debug en 2 min !
