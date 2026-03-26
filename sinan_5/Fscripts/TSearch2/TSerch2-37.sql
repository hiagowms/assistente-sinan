
CREATE OR REPLACE FUNCTION stat(text)
	returns setof statinfo
	as '$libdir/tsearch2', 'ts_stat'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION stat(text,text)
	returns setof statinfo
	as '$libdir/tsearch2', 'ts_stat'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION reset_tsearch()
        returns void
        as '$libdir/tsearch2'
        language 'C'
        with (isstrict);

CREATE OR REPLACE FUNCTION get_covers(tsvector,tsquery)
        returns text
        as '$libdir/tsearch2'
        language 'C'
        with (isstrict);

