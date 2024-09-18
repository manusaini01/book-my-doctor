SELECT
    conname AS constraint_name,
    conrelid::regclass AS referencing_table,
    a.attname AS referencing_column,
    confrelid::regclass AS referenced_table,
    af.attname AS referenced_column,
    CASE
        WHEN confdeltype = 'c' THEN 'CASCADE'
        WHEN confdeltype = 'r' THEN 'RESTRICT'
        WHEN confdeltype = 'n' THEN 'NO ACTION'
        WHEN confdeltype = 'd' THEN 'SET NULL'
        ELSE 'UNKNOWN'
    END AS on_delete_action
FROM
    pg_constraint AS c
JOIN
    pg_attribute AS a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
JOIN
    pg_attribute AS af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
WHERE
    c.contype = 'f';  -- foreign key constraints
