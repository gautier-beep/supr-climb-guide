-- Multi-language support for gyms
-- Run in Supabase SQL Editor

ALTER TABLE gyms ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'fr'
  CHECK (language IN ('fr', 'en', 'es', 'de', 'it'));

UPDATE gyms SET language = 'fr' WHERE slug = 'bloc-en-stock';

-- Test gym in English (adjust other columns to match your schema)
INSERT INTO gyms (slug, name, language, primary_color, secondary_color, welcome_message, address)
VALUES (
  'test-en',
  'SUPR Test Gym (EN)',
  'en',
  '#14b8a6',
  '#ecfdf5',
  'Ready for your bouldering initiation?',
  '123 Test Street'
)
ON CONFLICT (slug) DO UPDATE SET language = 'en';

-- Demo gym
INSERT INTO gyms (slug, name, language, primary_color, secondary_color, welcome_message, address)
VALUES (
  'demo',
  'SUPR Demo Gym',
  'fr',
  '#14b8a6',
  '#ecfdf5',
  'Bienvenue en mode démo !',
  'Mode démonstration'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  language = EXCLUDED.language,
  welcome_message = EXCLUDED.welcome_message;
