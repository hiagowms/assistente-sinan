CREATE OR REPLACE FUNCTION length(tsvector)
RETURNS int4
AS '$libdir/tsearch2', 'tsvector_length'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION to_tsvector(oid, text)
RETURNS tsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION to_tsvector(text, text)
RETURNS tsvector
AS '$libdir/tsearch2', 'to_tsvector_name'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION to_tsvector(text)
RETURNS tsvector
AS '$libdir/tsearch2', 'to_tsvector_current'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION strip(tsvector)
RETURNS tsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION setweight(tsvector,"char")
RETURNS tsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict,iscachable);

CREATE OR REPLACE FUNCTION concat(tsvector,tsvector)
RETURNS tsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict,iscachable);

