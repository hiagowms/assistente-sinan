
CREATE OR REPLACE FUNCTION parse(oid,text)
	returns setof tokenout
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);
 
CREATE OR REPLACE FUNCTION parse(text,text)
	returns setof tokenout
	as '$libdir/tsearch2', 'parse_byname'
	language 'C'
	with (isstrict);
 
CREATE OR REPLACE FUNCTION parse(text)
	returns setof tokenout
	as '$libdir/tsearch2', 'parse_current'
	language 'C'
	with (isstrict);
 
CREATE OR REPLACE FUNCTION prsd_start(internal,int4)
	returns internal
	as '$libdir/tsearch2'
	language 'C';

CREATE OR REPLACE FUNCTION prsd_getlexeme(internal,internal,internal)
	returns int4
	as '$libdir/tsearch2'
	language 'C';

CREATE OR REPLACE FUNCTION prsd_end(internal)
	returns void
	as '$libdir/tsearch2'
	language 'C';

CREATE OR REPLACE FUNCTION prsd_lextype(internal)
	returns internal
	as '$libdir/tsearch2'
	language 'C';

CREATE OR REPLACE FUNCTION prsd_headline(internal,internal,internal)
	returns internal
	as '$libdir/tsearch2'
	language 'C';

