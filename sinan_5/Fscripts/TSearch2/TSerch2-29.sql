CREATE OR REPLACE FUNCTION querytree(tsquery)
RETURNS text
AS '$libdir/tsearch2', 'tsquerytree'
LANGUAGE 'C' with (isstrict);

CREATE OR REPLACE FUNCTION to_tsquery(oid, text)
RETURNS tsquery
AS '$libdir/tsearch2'
LANGUAGE 'c' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION to_tsquery(text, text)
RETURNS tsquery
AS '$libdir/tsearch2','to_tsquery_name'
LANGUAGE 'c' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION to_tsquery(text)
RETURNS tsquery
AS '$libdir/tsearch2','to_tsquery_current'
LANGUAGE 'c' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION exectsq(tsvector, tsquery)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict, iscachable);
  
COMMENT ON FUNCTION exectsq(tsvector, tsquery) IS 'boolean operation with text index';

CREATE OR REPLACE FUNCTION rexectsq(tsquery, tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict, iscachable);

COMMENT ON FUNCTION rexectsq(tsquery, tsvector) IS 'boolean operation with text index';

