
CREATE TYPE tsvector (
        INTERNALLENGTH = -1,
        INPUT = tsvector_in,
        OUTPUT = tsvector_out,
        STORAGE = extended
);

