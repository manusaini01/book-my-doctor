SELECT
    n.nspname AS schema_name,
    p.proname AS function_name,
    pg_catalog.pg_get_functiondef(p.oid) AS function_definition
FROM
    pg_catalog.pg_proc p
JOIN
    pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE
    n.nspname = 'public'  -- Adjust if your functions are in a different schema
ORDER BY
    n.nspname,
    p.proname;


CREATE OR REPLACE FUNCTION delete_related_records()
RETURNS TRIGGER AS $$
BEGIN

-- Delete related tokens
    DELETE FROM tokens WHERE user_id IN (
        SELECT user_id FROM doctors WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM receptionists WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM hospitals WHERE hospital_id = OLD.hospital_id  -- Include user_id from the hospital table
    );

    -- Delete related doctor-receptionist assignments
    DELETE FROM doctor_receptionist_assignments WHERE doctor_id IN (
        SELECT doctor_id FROM doctors WHERE hospital_id = OLD.hospital_id
    );

    -- Delete related availabilities for doctors
    DELETE FROM availabilities WHERE doctor_id IN (
        SELECT doctor_id FROM doctors WHERE hospital_id = OLD.hospital_id
    );

    -- Delete related doctors
    DELETE FROM doctors WHERE hospital_id = OLD.hospital_id;

    -- Delete related receptionists
    DELETE FROM receptionists WHERE hospital_id = OLD.hospital_id;

 

  -- Delete related users (doctors and receptionists)
    DELETE FROM users WHERE id IN (
        SELECT user_id FROM doctors WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM receptionists WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM hospitals WHERE hospital_id = OLD.hospital_id  -- Include user_id from the hospital table
    );

    -- No need to delete from hospitals here, let the DELETE command proceed
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION delete_users_associated_with_hospital()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM users
    WHERE id IN (
        SELECT user_id FROM doctors WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM receptionists WHERE hospital_id = OLD.hospital_id
        UNION
        SELECT user_id FROM hospitals WHERE hospital_id = OLD.hospital_id
    );

    RETURN OLD; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_hospital_delete
BEFORE DELETE ON hospitals
FOR EACH ROW
EXECUTE FUNCTION delete_users_associated_with_hospital();

