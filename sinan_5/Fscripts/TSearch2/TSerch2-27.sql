CREATE OR REPLACE FUNCTION tsquery_in(cstring)
RETURNS tsquery
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

CREATE OR REPLACE FUNCTION tsquery_out(tsquery)
RETURNS cstring
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

