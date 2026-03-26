CREATE OR REPLACE FUNCTION tsvector_in(cstring)
RETURNS tsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

CREATE OR REPLACE FUNCTION tsvector_out(tsvector)
RETURNS cstring
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);
