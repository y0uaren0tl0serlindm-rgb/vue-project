BEGIN TRANSACTION;

DROP TABLE IF EXISTS temp_fragments;

CREATE TEMP TABLE temp_fragments (
  title TEXT,
  text TEXT,
  category TEXT
);

.mode csv
.import --skip 1 fragments.csv temp_fragments

INSERT INTO fragments (title, text, category)
SELECT
  title,
  text,
  COALESCE(NULLIF(category, ''), 'misc')
FROM temp_fragments
WHERE title IS NOT NULL
  AND title != ''
  AND text IS NOT NULL
  AND text != '';

DROP TABLE temp_fragments;

COMMIT;