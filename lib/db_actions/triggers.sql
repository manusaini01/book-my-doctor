SELECT 
    event_object_table AS table_name,
    trigger_name,
    event_manipulation AS trigger_event,
    action_timing AS trigger_timing,
    action_statement AS trigger_function
FROM 
    information_schema.triggers
WHERE 
    trigger_schema = 'public';  -- Adjust if your triggers are in a different schema



CREATE TRIGGER trg_delete_all_related_records
BEFORE DELETE ON hospitals
FOR EACH ROW
EXECUTE FUNCTION delete_related_records();
