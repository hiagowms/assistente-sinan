CREATE OR REPLACE FUNCTION _get_parser_from_curcfg() 
returns text as 
' select prs_name from pg_ts_cfg where oid = show_curcfg() '
language 'SQL' with(isstrict,iscachable);

CREATE OR REPLACE FUNCTION ts_debug(text)
returns setof tsdebug as '
select 
        m.ts_name,
        t.alias as tok_type,
        t.descr as description,
        p.token,
        m.dict_name,
        strip(to_tsvector(p.token)) as tsvector
from
        parse( _get_parser_from_curcfg(), $1 ) as p,
        token_type() as t,
        pg_ts_cfgmap as m,
        pg_ts_cfg as c
where
        t.tokid=p.tokid and
        t.alias = m.tok_alias and 
        m.ts_name=c.ts_name and 
        c.oid=show_curcfg() 
' language 'SQL' with(isstrict);


CREATE OR REPLACE FUNCTION tsvector_cmp(tsvector,tsvector)
RETURNS int4
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);

CREATE OR REPLACE FUNCTION tsvector_lt(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);

CREATE OR REPLACE FUNCTION tsvector_le(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);
        
CREATE OR REPLACE FUNCTION tsvector_eq(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);

CREATE OR REPLACE FUNCTION tsvector_ge(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);
        
CREATE OR REPLACE FUNCTION tsvector_gt(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);

CREATE OR REPLACE FUNCTION tsvector_ne(tsvector,tsvector)
RETURNS bool
AS '$libdir/tsearch2'
LANGUAGE 'C' WITH (isstrict,iscachable);

