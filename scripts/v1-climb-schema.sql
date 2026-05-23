-- Référence schéma V1 (tables déjà créées côté Supabase)
-- sessions, routes_progress, badges, leaderboard_weekly

-- sessions (colonnes attendues par l'app)
-- circuit_completed : NULL au départ (CHECK interdit 0 — min 1 ou NULL)
-- id, gym_slug, user_name, user_level, expires_at,
-- points_earned, circuit_completed, routes_completed, routes_total,
-- total_duration, perfect_run, completed_at, shared_social, created_at

-- routes_progress
-- id, session_id, circuit_number, route_number, completed, skipped

-- badges
-- id, session_id, badge_type, unlocked_at

-- leaderboard_weekly (vue)
-- gym_slug, user_name, circuits_completed, points
