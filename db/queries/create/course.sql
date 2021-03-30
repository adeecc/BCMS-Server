CREATE TABLE IF NOT EXISTS bcms_course (
    cid SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    code VARCHAR(8) NOT NULL,
    year SMALLINT NOT NULL,
    sem SMALLINT NOT NULL, -- Set to varchar(n) to accomodate summer term
    instructor_id INTEGER NOT NULL
);

-- Instructor Constraint
DO $$
BEGIN

    BEGIN
        ALTER TABLE bcms_course
        ADD CONSTRAINT FK_course_user
        FOREIGN KEY (instructor_id)
        REFERENCES bcms_user(uid) ON DELETE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN RAISE NOTICE 'Foreign Key constraint FK_course_user already exists';
    END;
END $$;