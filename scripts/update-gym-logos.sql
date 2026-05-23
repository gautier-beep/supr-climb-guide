-- Logos officiels (à exécuter dans Supabase SQL Editor)
-- Sources : sites web des salles, mai 2026

UPDATE gyms SET logo_url = 'https://bloc-en-stock.fr/wp-content/uploads/2022/04/Groupe-2.png'
WHERE slug = 'bloc-en-stock';

UPDATE gyms SET logo_url = 'https://blocshop.com/wp-content/uploads/2024/08/cropped-colored_back_2025.png'
WHERE slug = 'bloc-shop';

-- Boulder Space : pas de salle trouvée sous ce nom — logo Space Bloc (Annecy) en attendant
UPDATE gyms SET logo_url = 'https://www.spacebloc.fr/assets/images/logoSpaceBloc.svg'
WHERE slug = 'boulder-space';
