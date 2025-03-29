-- Cleanup script to remove any humanizer-related tables

-- Drop tables if they exist
DROP TABLE IF EXISTS humanize_requests;
DROP TABLE IF EXISTS humanize_responses;
DROP TABLE IF EXISTS humanize_logs;
DROP TABLE IF EXISTS humanize_stats;
DROP TABLE IF EXISTS humanize_settings;
DROP TABLE IF EXISTS ai_detection_results;
DROP TABLE IF EXISTS api_proxy_logs;
DROP TABLE IF EXISTS api_proxy_cache;

-- Drop any humanizing-related views
DROP VIEW IF EXISTS humanize_stats_view;
DROP VIEW IF EXISTS ai_detection_stats;

-- Drop any functions related to humanizing
DROP FUNCTION IF EXISTS calculate_humanize_stats();
DROP FUNCTION IF EXISTS update_humanize_stats();
DROP FUNCTION IF EXISTS detect_ai_content();

-- If there are any sequences for these tables, drop them too
DROP SEQUENCE IF EXISTS humanize_requests_id_seq;
DROP SEQUENCE IF EXISTS humanize_responses_id_seq;
DROP SEQUENCE IF EXISTS humanize_logs_id_seq;
DROP SEQUENCE IF EXISTS humanize_stats_id_seq;
DROP SEQUENCE IF EXISTS humanize_settings_id_seq;
DROP SEQUENCE IF EXISTS ai_detection_results_id_seq;
DROP SEQUENCE IF EXISTS api_proxy_logs_id_seq;
DROP SEQUENCE IF EXISTS api_proxy_cache_id_seq;

-- Commit the changes
COMMIT;
