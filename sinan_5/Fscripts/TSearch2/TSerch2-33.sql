CREATE OR REPLACE FUNCTION gtsvector_consistent(gtsvector,internal,int4)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C';
  
CREATE OR REPLACE FUNCTION gtsvector_compress(internal)
RETURNS internal
AS '$libdir/tsearch2'
LANGUAGE 'C';

CREATE OR REPLACE FUNCTION gtsvector_decompress(internal)
RETURNS internal
AS '$libdir/tsearch2'
LANGUAGE 'C';

CREATE OR REPLACE FUNCTION gtsvector_penalty(internal,internal,internal)
RETURNS internal
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

CREATE OR REPLACE FUNCTION gtsvector_picksplit(internal, internal)
RETURNS internal
AS '$libdir/tsearch2'
LANGUAGE 'C';

CREATE OR REPLACE FUNCTION gtsvector_union(internal, internal)
RETURNS _int4
AS '$libdir/tsearch2'
LANGUAGE 'C';

CREATE OR REPLACE FUNCTION gtsvector_same(gtsvector, gtsvector, internal)
RETURNS internal
AS '$libdir/tsearch2'
LANGUAGE 'C';

