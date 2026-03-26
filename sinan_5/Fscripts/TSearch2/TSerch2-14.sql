CREATE OR REPLACE FUNCTION token_type(int4)
	returns setof tokentype
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION token_type(text)
	returns setof tokentype
	as '$libdir/tsearch2', 'token_type_byname'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION token_type()
	returns setof tokentype
	as '$libdir/tsearch2', 'token_type_current'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION set_curprs(int)
	returns void
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION set_curprs(text)
	returns void
	as '$libdir/tsearch2', 'set_curprs_byname'
	language 'C'
	with (isstrict);

