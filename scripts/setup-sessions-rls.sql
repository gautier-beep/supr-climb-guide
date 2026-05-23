-- Exécuter dans Supabase → SQL Editor
-- Corrige : "new row violates row-level security policy for table sessions"

-- ─── SESSIONS ───────────────────────────────────────────────
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_sessions" ON sessions;
DROP POLICY IF EXISTS "anon_select_sessions" ON sessions;
DROP POLICY IF EXISTS "anon_update_sessions" ON sessions;

CREATE POLICY "anon_insert_sessions"
  ON sessions FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_sessions"
  ON sessions FOR SELECT TO anon
  USING (true);

CREATE POLICY "anon_update_sessions"
  ON sessions FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- ─── ROUTES_PROGRESS ────────────────────────────────────────
ALTER TABLE routes_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_routes_progress" ON routes_progress;
DROP POLICY IF EXISTS "anon_select_routes_progress" ON routes_progress;

CREATE POLICY "anon_insert_routes_progress"
  ON routes_progress FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_routes_progress"
  ON routes_progress FOR SELECT TO anon
  USING (true);

-- ─── BADGES ───────────────────────────────────────────────
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_badges" ON badges;
DROP POLICY IF EXISTS "anon_select_badges" ON badges;

CREATE POLICY "anon_insert_badges"
  ON badges FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_badges"
  ON badges FOR SELECT TO anon
  USING (true);

-- leaderboard_weekly : vue en lecture seule (GRANT si besoin)
-- GRANT SELECT ON leaderboard_weekly TO anon;
