CREATE OR REPLACE FUNCTION tsearch2()
RETURNS trigger
AS '$libdir/tsearch2'
LANGUAGE 'C';

CREATE OR REPLACE FUNCTION rank(float4[], tsvector, tsquery)
RETURNS float4
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank(float4[], tsvector, tsquery, int4)
RETURNS float4
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank(tsvector, tsquery)
RETURNS float4
AS '$libdir/tsearch2', 'rank_def'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank(tsvector, tsquery, int4)
RETURNS float4
AS '$libdir/tsearch2', 'rank_def'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank_cd(int4, tsvector, tsquery)
RETURNS float4
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank_cd(int4, tsvector, tsquery, int4)
RETURNS float4
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank_cd(tsvector, tsquery)
RETURNS float4
AS '$libdir/tsearch2', 'rank_cd_def'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION rank_cd(tsvector, tsquery, int4)
RETURNS float4
AS '$libdir/tsearch2', 'rank_cd_def'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(oid, text, tsquery, text)
RETURNS text
AS '$libdir/tsearch2', 'headline'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(oid, text, tsquery)
RETURNS text
AS '$libdir/tsearch2', 'headline'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(text, text, tsquery, text)
RETURNS text
AS '$libdir/tsearch2', 'headline_byname'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(text, text, tsquery)
RETURNS text
AS '$libdir/tsearch2', 'headline_byname'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(text, tsquery, text)
RETURNS text
AS '$libdir/tsearch2', 'headline_current'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION headline(text, tsquery)
RETURNS text
AS '$libdir/tsearch2', 'headline_current'
LANGUAGE 'C' WITH (isstrict, iscachable);

CREATE OR REPLACE FUNCTION gtsvector_in(cstring)
RETURNS gtsvector
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

CREATE OR REPLACE FUNCTION gtsvector_out(gtsvector)
RETURNS cstring
AS '$libdir/tsearch2'
LANGUAGE 'C' with (isstrict);

